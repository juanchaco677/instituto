import { DesktopMultimediaComponent } from './desktop-multimedia/desktop-multimedia.component';
import { Sesion } from './../../../utils/sesion';
import { ListVideoComponent } from './../chat/list-video/list-video.component';
import { Room } from './../../model/room';
import { VideoBoton } from './../../model/video-boton';
import { Usuario } from './../../../dashboard/modelo/usuario';
import { PeerClient } from './../../model/peer-client';
import { PeerServer } from './../../model/peer-server';
import { Video } from './../../model/video';
import { SocketIoClientService } from '../../service/socket-io-client.service';
import { ViewChild, ElementRef, Input, QueryList, Output } from '@angular/core';
import { BotonesService } from '../../service/botones.service';
import { Util } from 'src/app/utils/util';
import { PeerServerEmisorReceptor } from '../../model/peer-server-emisor-receptor';

export class DualMultimedia {
  @Input() width: string;
  @Input() height: string;
  @Input() tipo: string = null;
  @Input() peerServer: PeerServer;
  @Input() peerClient: PeerClient;
  @Input() activo: boolean;
  @Input() usuario: Usuario;
  @Input() visible: boolean;
  @Input() htmlListVideo: ListVideoComponent;
  @Input() listContentDesktop: QueryList<DesktopMultimediaComponent>;
  @Input() esComponenteItem: boolean;
  contador = 0;
  hilo = true;
  afterCont = true;
  usuarioSesion: Usuario;
  @Output() videoBoton: VideoBoton;
  video: Video;
  room: Room;
  worker: Worker;
  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    console.log('..despues o antes del contrusctor..');
    console.log(this.camDesktop);
    this.video = new Video(this.camDesktop ? 2 : 1, el.nativeElement);
  }
  constructor(
    public camDesktop: boolean,
    public socket: SocketIoClientService,
    public botones: BotonesService
  ) {
    this.videoBoton = new VideoBoton(false, false, false, false);
    this.usuarioSesion = Sesion.userAulaChat();
  }

  initWebWorker() {
    this.worker = new Worker('./thread.worker', {
      type: 'module',
    });

    this.worker.onmessage = ({ data }) => {
      if (!Util.empty(data) && data) {
        this.sendInfoBotones();
        if (this.hilo) {
          this.worker.postMessage(true);
        } else {
          this.hilo = true;
          this.worker.postMessage(false);
        }
      }
    };
  }

  listenPeer() {
    this.socket.listen$.subscribe((data) => {
      if (!Util.empty(data) && data && !Util.empty(this.peerServer)) {
        this.peerServer.peerConnection.ontrack = this.getRemoteStream.bind(
          this
        );
        this.peerServer.peerConnection.ondatachannel = this.getOnDataChannel.bind(
          this
        );
      }
      if (!Util.empty(data) && data && !Util.empty(this.peerClient)) {
        this.peerClient.peerConnection.ontrack = this.getRemoteStream.bind(
          this
        );
        this.peerClient.peerConnection.ondatachannel = this.getOnDataChannel.bind(
          this
        );
      }
    });
  }

  getOnDataChannel(event: any) {
    if (this.camDesktop) {
      console.log('...... inicio channel desktop.........');
      this.peerServer.receiveChannel = event.channel;
      this.peerServer.receiveChannel.onmessage = (e: any) => {
        this.videoBoton = JSON.parse(e.data);
        let cont = 0;
        let contAux = 0;
        // tslint:disable-next-line: prefer-for-of
        for (
          let index = 0;
          index < this.listContentDesktop.toArray().length;
          index++
        ) {
          const element: DesktopMultimediaComponent = this.listContentDesktop.toArray()[
            index
          ] as DesktopMultimediaComponent;
          console.log('botones en desktop data channel');
          console.log(element);
          if (element.videoBoton.desktop) {
            cont++;
          }
          if (!element.videoBoton.desktop) {
            contAux++;
          }
        }
        if (
          this.listContentDesktop.toArray().length > 0 &&
          cont !== 0 &&
          this.listContentDesktop.toArray().length === cont
        ) {
          this.htmlListVideo.redimensionarItem = this.htmlListVideo.redimensionarItem + 1;
          this.htmlListVideo.redimensionar = true;
        }
        if (
          this.listContentDesktop.toArray().length > 0 &&
          contAux !== 0 &&
          this.listContentDesktop.toArray().length === contAux
        ) {
          this.htmlListVideo.redimensionarItem = 0;
          this.htmlListVideo.redimensionar = false;
        }
        this.visible = this.videoBoton.desktop ? false : true;
      };
      console.log('...FIN...');
    } else {
      this.peerServer.receiveChannel = event.channel;
      this.peerServer.receiveChannel.onmessage = (e: any) => {
        this.videoBoton = JSON.parse(e.data);
        console.log('get data channel cam');
        console.log(this.videoBoton);
      };
    }
  }

  getRemoteStream(ev: any) {
    try {
      if (ev.streams && ev.streams.length > 0) {
        for (const element of ev.streams) {
          this.video.video.srcObject = element;
          this.video.stream = element;
          this.listeAudio();
        }
      } else {
        const inboundStream = new MediaStream(ev.track);
        this.video.video.srcObject = inboundStream;
        this.video.stream = inboundStream;
        this.listeAudio();
      }
    } catch (error) {}
  }

  actualizarVideoBoton() {
    if (this.camDesktop) {
      this.videoBoton.desktop = this.video.videoCam;
    } else {
      this.videoBoton.video = this.video.videoCam;
      this.videoBoton.audio = this.video.audio;
    }
  }

  /**
   * escucha de audio
   */
  listeAudio() {
    if (!Util.empty(this.video.stream)) {
      const context = new AudioContext(); // NEW!!
      const analyser = context.createAnalyser();
      const microphone = context.createMediaStreamSource(this.video.stream);
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
      };
    }
  }

  async startCamDesktop(addtrack: boolean) {
    let stream = null;
    if (addtrack) {
      stream = this.video.stream;
    }
    if (
      !Util.empty(this.room) &&
      !Util.empty(this.room.usuarios) &&
      this.room.usuarios.length > 0
    ) {
      // this.socket.addListen(true);
      const emiRecep: PeerServerEmisorReceptor[] = [];
      for (const element of this.camDesktop
        ? this.room.peerServerEmisorReceptorDesktop
        : this.room.peerServerEmisorReceptor) {
        if (
          element.usuario1.id === this.usuarioSesion.id ||
          element.usuario2.id === this.usuarioSesion.id
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
      return new Promise((resolve) => {
        resolve(emiRecep);
      });
    }
    return null;
  }



  async start(addtrack: boolean, starDual: boolean) {
    let emiRecep: any = [];
    let emiRecepDesktop: any = [];
    if (starDual) {
      emiRecep = await this.startCamDesktop(addtrack);
      emiRecepDesktop = await this.startCamDesktop(addtrack);
    } else {
      if (this.camDesktop) {
        emiRecepDesktop = await this.startCamDesktop(addtrack);
      } else {
        emiRecep = await this.startCamDesktop(addtrack);
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

  async startAddUsuarioFor(camDesktop: boolean, data: Room) {
    if (
      !Util.empty(this.room) &&
      !Util.empty(this.room.usuarios) &&
      this.room.usuarios.length > 0
    ) {
      const emiRecep: PeerServerEmisorReceptor[] = [];
      for (const elementIn of camDesktop
        ? data.peerServerEmisorReceptorDesktop
        : data.peerServerEmisorReceptor) {
        for (const element of this.camDesktop
          ? this.room.peerServerEmisorReceptorDesktop
          : this.room.peerServerEmisorReceptor) {
          if (
            (element.usuario1.id === this.usuarioSesion.id ||
              element.usuario2.id === this.usuarioSesion.id) &&
            element.usuario1.id === elementIn.usuario1.id &&
            element.usuario2.id === elementIn.usuario2.id
          ) {
            await element.peerServer.createOffer();
            const peer: PeerServerEmisorReceptor = new PeerServerEmisorReceptor(
              element.usuario1,
              element.usuario2,
              element.peerServer,
              element.peerClient,
              element.videoBoton
            );
          }
        }
      }
      return new Promise((resolve) => {
        resolve(emiRecep);
      });
    }
    return null;
  }

  async startAddUsuario(data: Room) {
    let emiRecep: any = [];
    let emiRecepDesktop: any = [];
    emiRecep = await this.startAddUsuarioFor(false , data);
    emiRecepDesktop = await this.startAddUsuarioFor(true, data);
    this.socket.addRoom$(this.room);
    this.socket.addListen(true);
    this.socket.emit('createAnswer', {
      id: this.room.id,
      peerServerEmisorReceptor: emiRecep,
      peerServerEmisorReceptorDesktop: emiRecepDesktop,
    });

  }

  sendInfoBotones() {
    const emiRecep: PeerServerEmisorReceptor[] = [];
    for (const element of this.camDesktop
      ? this.room.peerServerEmisorReceptorDesktop
      : this.room.peerServerEmisorReceptor) {
      if (
        element.usuario1.id === this.usuarioSesion.id ||
        element.usuario2.id === this.usuarioSesion.id
      ) {
        emiRecep.push(element);
      }
    }
    for (const element of emiRecep) {
      if (element.peerServer.dataChannel.readyState === 'open') {
        this.contador++;
        element.peerServer.send(
          JSON.stringify({
            video: this.video.videoCam,
            audio: this.video.audio,
            desktop: this.video.videoCam,
          })
        );
      }
    }
    if (this.contador === emiRecep.length) {
      this.hilo = false;
      this.contador = 0;
    }
  }

  listenBotones() {
    this.botones.get().subscribe(async (data) => {
      if (!Util.empty(data) && this.esComponenteItem) {
        if (this.camDesktop) {
          switch (data) {
            case Util.desktop:

              this.htmlListVideo.redimensionar = true;
              this.visible = false;
              this.video.stop();
              await this.video.startVideo();
              this.video.stopBotonDisplayMedia();
              this.start(true, false);
              this.worker.postMessage({});
              this.actualizarVideoBoton();
              break;

            case Util.stopDesktop:
              this.htmlListVideo.redimensionar = false;
              this.visible = true;
              this.video.videoCam = !this.video.videoCam;
              this.video.stop();
              this.worker.postMessage({});
              this.actualizarVideoBoton();
              break;
          }
        } else {
          switch (data) {
            case Util.video:
              this.video.stop();
              await this.video.startVideo();
              await this.start(true, false);
              this.worker.postMessage(true);
              this.actualizarVideoBoton();
              break;

            case Util.audio:
              if (
                !Util.empty(this.video.stream) &&
                !Util.empty(this.video.stream.getAudioTracks()) &&
                this.video.stream.getAudioTracks().length > 0
              ) {
                await this.video.startMic();
                this.listeAudio();
              } else {
                await this.video.startMic();
                this.start(true, false);
                this.listeAudio();
              }
              this.worker.postMessage({});
              this.actualizarVideoBoton();
              break;
          }
        }
      }
    });
  }
}
