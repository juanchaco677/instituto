import { VideoBoton } from './../../../model/video-boton';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { ProgramacionHorario } from './../../../../dashboard/modelo/programacion-horario';
import { PeerServerEmisorReceptor } from './../../../model/peer-server-emisor-receptor';
import { Sesion } from './../../../../utils/sesion';
import { PeerServer } from './../../../model/peer-server';
import { Util } from './../../../../utils/util';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { VideoMultimediaComponent } from './../video-multimedia/video-multimedia.component';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { PeerClient } from 'src/app/aula-virtual/model/peer-client';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css'],
})
export class BotonesComponent implements OnInit, OnDestroy {
  @Input() htmlVideo: VideoMultimediaComponent;
  room: Room;
  programacion: ProgramacionHorario;
  @Input() activo: boolean;
  @Output() videoBoton: VideoBoton = new VideoBoton(false, false);
  @Input() peerServer: PeerServer;
  @Input() peerClient: PeerClient;
  emisorReceptor: PeerServerEmisorReceptor;
  sound: boolean;
  video: boolean;
  usuario: Usuario;
  hilo = true;
  worker: Worker;
  contador = 0;
  constructor(
    private socket: SocketIoClientService,
    private cdr: ChangeDetectorRef
  ) {
    this.usuario = Sesion.userAulaChat();
  }

  ngOnDestroy(): void {
    this.worker.terminate();
  }

  ngOnInit(): void {
    this.socket
      .getProgramacion$()
      .subscribe((data) => (this.programacion = data));
    this.socket.getRoom$().subscribe((data) => (this.room = data));
    this.start(false);
    this.initWebWorker();

    if (!Util.empty(this.peerServer)) {
      this.peerServer.peerConnection.ondatachannel = this.getOnDataChannel.bind(
        this
      );
    }
    if (!Util.empty(this.peerClient)) {
      this.peerClient.peerConnection.ondatachannel = this.getOnDataChannel.bind(
        this
      );
    }
  }



  initWebWorker() {
    this.worker = new Worker('./thread.worker', {
      type: 'module',
    });
    this.worker.onmessage = ({ data }) => {
      if (data) {
        this.sendInfoBotones();
        if (this.hilo) {
          this.worker.postMessage({});
        } else {
          this.hilo = true;
        }
      }
    };
  }

  async startVideo() {
    this.htmlVideo.video.stop();
    await this.htmlVideo.video.startVideo();
    this.start(true);
    this.worker.postMessage({});
  }

  async startMic() {
    if (
      !Util.empty(this.htmlVideo.video.stream) &&
      !Util.empty(this.htmlVideo.video.stream.getAudioTracks()) &&
      this.htmlVideo.video.stream.getAudioTracks().length > 0
    ) {
      await this.htmlVideo.video.startMic();
    } else {
      await this.htmlVideo.video.startMic();
      this.start(true);
    }
    this.worker.postMessage({});
  }

  async start(addtrack: boolean) {
    let stream = null;
    if (addtrack) {
      stream = this.htmlVideo.video.stream;
    }
    if (
      !Util.empty(this.room) &&
      !Util.empty(this.room.usuarios) &&
      this.room.usuarios.length > 0
    ) {
      this.socket.addListen(true);
      const emiRecep: PeerServerEmisorReceptor[] = [];
      for (const element of this.room.peerServerEmisorReceptor) {
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

          element.peerServer = element.peerServer;

          emiRecep.push(
            new PeerServerEmisorReceptor(
              element.usuario1,
              element.usuario2,
              element.peerServer,
              element.peerClient,
              element.videoBoton
            )
          );
          this.socket.addListen(true);
        }
      }

      this.socket.addRoom$(this.room);
      this.socket.emit('createAnswer', {
        id: this.room.id,
        peerServerEmisorReceptor: emiRecep,
      });
    }
  }

  sendInfoBotones() {
    const emiRecep: PeerServerEmisorReceptor[] = [];
    for (const element of this.room.peerServerEmisorReceptor) {
      if (
        element.usuario1.id === this.usuario.id ||
        element.usuario2.id === this.usuario.id
      ) {
        element.videoBoton.audio = this.htmlVideo.video.audio;
        element.videoBoton.video = this.htmlVideo.video.videoCam;
        emiRecep.push(element);
      }
    }
    for (const element of emiRecep) {
      if (element.peerServer.dataChannel.readyState === 'open') {
        this.contador++;
        element.peerServer.send(
          JSON.stringify({
            video: this.htmlVideo.video.videoCam,
            audio: this.htmlVideo.video.audio,
          })
        );
      }
    }
    if (this.contador === emiRecep.length) {
      this.hilo = false;
      this.contador = 0;
    }
  }

  getOnDataChannel(event: any) {
    this.peerServer.receiveChannel = event.channel;
    this.peerServer.receiveChannel.onmessage = (e: any) => {
      this.videoBoton = JSON.parse(e.data);
      this.cdr.detectChanges();
      console.log('message=>');
      console.log(this.videoBoton.audio);
    };
  }
}
