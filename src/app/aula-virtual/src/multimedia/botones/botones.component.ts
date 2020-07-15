import { VideoBoton } from './../../../model/video-boton';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { ProgramacionHorario } from './../../../../dashboard/modelo/programacion-horario';
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
  ChangeDetectorRef,
} from '@angular/core';

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
  @Input() videoBoton: VideoBoton = new VideoBoton(false, false);
  // @Input() peerServer: PeerServer;
  // @Input() peerClient: PeerClient;
  emisorReceptor: PeerServerEmisorReceptor;
  sound: boolean;
  video: boolean;
  usuario: Usuario;
  usuarioListen: Usuario;
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
    this.socket.getRoom$().subscribe((data) => (this.room = data));
    this.initWebWorker();
    this.usuarioListen = this.htmlVideo.usuario;
    this.socket.$refreshUsuario.subscribe((data) => {
      if (data) {
        if (this.htmlVideo.video.video || this.htmlVideo.video.audio) {
          this.start(true);
          this.worker.postMessage({});
        }
      }
    });
    this.start(false);
    this.socket.getListenAudio().subscribe((data) => {
      if (data) {
        if (!Util.empty(this.htmlVideo) && !Util.empty(this.htmlVideo.video)) {
          this.videoBoton.video = this.htmlVideo.video.videoCam;
          this.videoBoton.audio = this.htmlVideo.video.audio;
          this.cdr.detectChanges();
        }

        if (this.videoBoton.audio) {
          this.listeAudio();
        }
      }
    });
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
      this.socket.addListenAudio(true);
    } else {
      await this.htmlVideo.video.startMic();
      this.start(true);
    }
    this.worker.postMessage({});
  }

  async start(addtrack: boolean) {
    this.socket.addListenAudio(true);
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
  /**
   * escucha de audio
   */
  listeAudio() {
    if (
      !Util.empty(this.htmlVideo) &&
      !Util.empty(this.htmlVideo.video) &&
      !Util.empty(this.htmlVideo.video.stream)
    ) {
      const context = new AudioContext(); // NEW!!
      const analyser = context.createAnalyser();
      const microphone = context.createMediaStreamSource(
        this.htmlVideo.video.stream
      );
      const javascriptNode = context.createScriptProcessor(2048, 1, 1);
      analyser.smoothingTimeConstant = 0.3;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(context.destination);

      // tslint:disable-next-line: deprecation
      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;
        const length = array.length;
        for (let i = 0; i < length; i++) {
          values += array[i];
        }
        const average = values / length;
        if (average >= 3.5) {
          this.videoBoton.latencia = true;
        } else {
          this.videoBoton.latencia = false;
        }
        this.cdr.detectChanges();
      };
    }
  }
}
