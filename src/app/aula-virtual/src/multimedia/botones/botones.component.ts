import { ListVideoComponent } from './../../chat/list-video/list-video.component';
import { DesktopMultimediaComponent } from './../desktop-multimedia/desktop-multimedia.component';
import { VideoBoton } from './../../../model/video-boton';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { PeerServerEmisorReceptor } from './../../../model/peer-server-emisor-receptor';
import { Sesion } from './../../../../utils/sesion';
import { Util } from './../../../../utils/util';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { VideoMultimediaComponent } from './../video-multimedia/video-multimedia.component';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css'],
})
export class BotonesComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() htmlVideo: VideoMultimediaComponent;
  @Input() htmlVideoDesktop: DesktopMultimediaComponent;
  @Input() htmlListVideo: ListVideoComponent;
  @Input() activo: boolean;
  @Input() videoBoton: VideoBoton = new VideoBoton(false, false);
  usuario: Usuario;
  hilo = true;
  hiloDesktop = true;
  worker: Worker;
  workerDesktop: Worker;
  contador = 0;
  contadorDesktop = 0;
  afterCont = true;
  room: Room;
  constructor(
    private socket: SocketIoClientService,
    public cdr: ChangeDetectorRef
  ) {
    this.usuario = Sesion.userAulaChat();
  }
  ngAfterContentInit(): void {}

  ngOnDestroy(): void {
    this.worker.terminate();
    this.workerDesktop.terminate();
  }

  ngOnInit(): void {
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
        if (this.afterCont) {
          this.afterCont = false;
          this.start(null, null, true);
        }
      }
    });
    this.initWebWorker();
    this.socket.$refreshUsuario.subscribe((data) => {
      if (data) {
        if (this.htmlVideo.video.video || this.htmlVideo.video.audio) {
          this.start(true, null, true);
          this.worker.postMessage({});
          this.workerDesktop.postMessage({});
        }
      }
    });
  }

  initWebWorker() {
    this.worker = new Worker('./thread.worker', {
      type: 'module',
    });
    this.workerDesktop = new Worker('./thread.worker', {
      type: 'module',
    });
    this.worker.onmessage = ({ data }) => {
      if (!Util.empty(data) && data) {
        this.sendInfoBotones(false);
        if (this.hilo) {
          this.worker.postMessage({});
        } else {
          this.hilo = true;
        }
      }
    };
    this.workerDesktop.onmessage = ({ data }) => {
      if (data) {
        this.sendInfoBotones(true);
        if (this.hiloDesktop) {
          this.workerDesktop.postMessage({});
        } else {
          this.hiloDesktop = true;
        }
      }
    };
  }

  async startVideo() {
    this.htmlVideo.video.stop();
    await this.htmlVideo.video.startVideo();
    this.start(true, false, false);
    this.worker.postMessage({});
    this.htmlVideo.actualizarVideoBoton();
  }

  async startVideoDesktop() {
    this.htmlListVideo.redimensionar = true;
    this.htmlVideoDesktop.visible = false;
    this.htmlVideoDesktop.video.stop();
    await this.htmlVideoDesktop.video.startVideo();
    this.start(true, true, false);
    this.workerDesktop.postMessage({});
  }

  stopVideoDesktop() {
    this.htmlListVideo.redimensionar = false;
    this.htmlVideoDesktop.visible = true;
    this.htmlVideoDesktop.video.videoCam = !this.htmlVideoDesktop.video
      .videoCam;
    this.htmlVideoDesktop.video.stop();
    this.workerDesktop.postMessage({});
  }

  async startMic() {
    if (
      !Util.empty(this.htmlVideo.video.stream) &&
      !Util.empty(this.htmlVideo.video.stream.getAudioTracks()) &&
      this.htmlVideo.video.stream.getAudioTracks().length > 0
    ) {
      await this.htmlVideo.video.startMic();
      // this.htmlVideo.actualizarVideoBoton();
      this.htmlVideo.listeAudio();
    } else {
      await this.htmlVideo.video.startMic();
      this.start(true, false, false);
      // this.htmlVideo.actualizarVideoBoton();
      this.htmlVideo.listeAudio();
    }
    this.worker.postMessage({});
  }

  async startCamDesktop(addtrack: boolean, camDesktop: boolean) {
    // this.socket.addListenAudio(true);
    let stream = null;
    if (addtrack) {
      if (camDesktop) {
        stream = this.htmlVideoDesktop.video.stream;
      } else {
        stream = this.htmlVideo.video.stream;
      }
    }
    if (
      !Util.empty(this.room) &&
      !Util.empty(this.room.usuarios) &&
      this.room.usuarios.length > 0
    ) {
      this.socket.addListen(true);
      const emiRecep: PeerServerEmisorReceptor[] = [];
      for (const element of camDesktop
        ? this.room.peerServerEmisorReceptorDesktop
        : this.room.peerServerEmisorReceptor) {
        if (
          element.usuario1.id === this.usuario.id ||
          element.usuario2.id === this.usuario.id
        ) {
          if (addtrack && !Util.empty(stream)) {
            for (const track of stream.getTracks()) {
              element.peerServer.peerConnection.addTrack(track, stream);
            }
          }

          await element.peerServer.createOffer();

          emiRecep.push(
            new PeerServerEmisorReceptor(
              element.usuario1,
              element.usuario2,
              element.peerServer,
              element.peerClient,
              element.videoBoton
            )
          );
        }
      }
      return emiRecep;
    }
    return null;
  }

  async start(addtrack: boolean, camDesktop: boolean, initDual: boolean) {
    // this.socket.addListenAudio(true);

    this.socket.addListen(true);
    let emiRecep = null;
    let emiRecepDesktop = null;
    if (initDual) {
      await this.startCamDesktop(addtrack, false).then(
        (data) => (emiRecep = data)
      );
      await this.startCamDesktop(addtrack, true).then(
        (data) => (emiRecepDesktop = data)
      );
    } else {
      if (!camDesktop) {
        await this.startCamDesktop(addtrack, false).then(
          (data) => (emiRecep = data)
        );
      } else {
        await this.startCamDesktop(addtrack, true).then(
          (data) => (emiRecepDesktop = data)
        );
      }
    }

    this.socket.addRoom$(this.room);
    this.socket.addListen(true);
    this.socket.emit('createAnswer', {
      id: this.room.id,
      peerServerEmisorReceptor: emiRecep,
      peerServerEmisorReceptorDesktop: emiRecepDesktop,
    });
  }

  sendInfoBotones(camDesktop: boolean) {
    const emiRecep: PeerServerEmisorReceptor[] = [];
    for (const element of camDesktop
      ? this.room.peerServerEmisorReceptorDesktop
      : this.room.peerServerEmisorReceptor) {
      if (
        element.usuario1.id === this.usuario.id ||
        element.usuario2.id === this.usuario.id
      ) {
        emiRecep.push(element);
      }
    }
    for (const element of emiRecep) {
      if (element.peerServer.dataChannel.readyState === 'open') {
        if (camDesktop) {
          this.contadorDesktop++;
        } else {
          this.contador++;
        }
        element.peerServer.send(
          JSON.stringify({
            video: this.htmlVideo.video.videoCam,
            audio: this.htmlVideo.video.audio,
            desktop: this.htmlVideoDesktop.video.videoCam,
          })
        );
        console.log('enviado...');
        console.log(this.htmlVideo.video.videoCam);
      }
    }
    if (!camDesktop && this.contador === emiRecep.length) {
      this.hilo = false;
      this.contador = 0;
    }
    if (camDesktop && this.contadorDesktop === emiRecep.length) {
      this.hiloDesktop = false;
      this.contadorDesktop = 0;
    }
  }
}
