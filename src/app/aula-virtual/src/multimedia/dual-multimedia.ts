import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { VideoMultimediaComponent } from './video-multimedia/video-multimedia.component';
import { DesktopMultimediaComponent } from './desktop-multimedia/desktop-multimedia.component';
import { Sesion } from './../../../utils/sesion';
import { ListVideoComponent } from './../chat/list-video/list-video.component';
import { Room } from './../../model/room';
import { VideoBoton } from './../../model/video-boton';
import { PeerClient } from './../../model/peer-client';
import { PeerServer } from './../../model/peer-server';
import { Video } from './../../model/video';
import { SocketIoClientService } from '../../service/socket-io-client.service';
import {
  ViewChild,
  ElementRef,
  Input,
  QueryList,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { BotonesService } from '../../service/botones.service';
import { Util } from 'src/app/utils/util';
import { PeerServerEmisorReceptor } from '../../model/peer-server-emisor-receptor';

export class DualMultimedia {
  @Input() styleSize: any;
  @Input() htmlVideoDesktop: DesktopMultimediaComponent; // es necesario para completar el for del list video multimedia
  @Input() width: string; // ancho del componente
  @Input() height: string; // alto del componente
  @Input() peerServer: PeerServer; // peer server
  @Input() peerClient: PeerClient; // peer client
  @Input() usuario: Usuario;
  @Input() visible = true; // variable para el atributo hidden el componente
  @Input() htmlListVideo: ListVideoComponent;
  @Input() element: PeerServerEmisorReceptor;
  @Input() key: string;
  @Input() listContentDesktop: QueryList<DesktopMultimediaComponent>; // es el for que esta en el list video multimedia
  @Input() listVideoMultimedia: QueryList<VideoMultimediaComponent>;
  @Input() esComponenteItem: boolean; // variable que me dice si es un solo componenete o esta dentro de un for
  @Input() videoMultimedia: VideoMultimediaComponent;
  @Input() styleFontSize: string;
  @Input() color: string;
  usuarioSesion: Usuario;
  videoBoton: VideoBoton;
  video: Video;
  room: Room;
  channel = false;

  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    this.video = new Video(this.camDesktop ? 2 : 1, el.nativeElement);
  }
  constructor(
    public camDesktop: boolean,
    public socket: SocketIoClientService,
    public botones: BotonesService,
    public cdr: ChangeDetectorRef
  ) {
    this.videoBoton = new VideoBoton(false, false, false, false);
    this.usuarioSesion = Sesion.userAulaChat();
    this.usuarioSesion.boton = new VideoBoton(false, false, false, false, false);
  }

  /**
   * función para escuchar la informacion track o datos que viene del servidor peer o client
   */
  listenPeer() {
    this.socket.listen$.subscribe((data) => {
      if (!Util.empty(data) && data && !Util.empty(this.peerServer)) {
        this.peerServer.peerConnection.ontrack = this.getRemoteStream.bind(
          this
        );

        this.peerServer.peerConnection.onicecandidate = (event: any) =>
          this.getIceCandidate(event, true);

        this.peerServer.dataChannel.onerror = (error) => {
          console.log('Data Channel Error:', error);
        };

        this.peerServer.dataChannel.onopen = () => {
          this.channel = true;
          const videoBoton: VideoBoton = this.camDesktop
            ? this.htmlVideoDesktop.videoBoton
            : this.videoMultimedia.videoBoton;
          this.peerServer.send(JSON.stringify(videoBoton));
        };

        this.peerServer.dataChannel.onclose = () => {
          this.channel = false;
        };

        this.peerServer.peerConnection.ondatachannel = (event: any) =>
          this.getOnDataChannel(event, true);

        // this.peerClient.dataChannel.onopen = (event: any) =>
        //   this.getOnOpenDataChannel(event, true);
      }
      if (!Util.empty(data) && data && !Util.empty(this.peerClient)) {
        this.peerClient.peerConnection.ontrack = this.getRemoteStream.bind(
          this
        );

        this.peerClient.peerConnection.onicecandidate = (event: any) =>
          this.getIceCandidate(event, false);

        // this.peerClient.dataChannel.onopen = (event: any) =>
        //   this.getOnOpenDataChannel(event, false);
        this.peerClient.dataChannel.onerror = (error) => {};

        this.peerClient.dataChannel.onopen = () => {
          // this.peerClient.send(JSON.stringify(this.videoBoton));
        };

        this.peerClient.dataChannel.onclose = () => {};

        this.peerClient.peerConnection.ondatachannel = (event: any) =>
          this.getOnDataChannel(event, false);
      }
    });
  }

  getOnDataChannel(event: any, serverClient: boolean) {
    if (serverClient) {
      this.peerServer.receiveChannel = event.channel;
      this.peerServer.receiveChannel.onmessage = (e: any) => {
        this.videoBoton = JSON.parse(e.data);
        this.cdr.detectChanges();
      };
    } else {
      this.peerClient.receiveChannel = event.channel;
      this.peerClient.receiveChannel.onmessage = (e: any) => {
        this.videoBoton = JSON.parse(e.data);
        this.cdr.detectChanges();
        console.log('reciviendo data channel......');
        console.log(this.videoBoton);
        if (this.camDesktop) {
          this.visible = this.videoBoton.desktop ? false : true;
          const cont = this.buscarDesktopMultimedia();
          this.htmlListVideo.contVisibleDesktop = cont;
          this.htmlListVideo.redimensionar = cont > 0;
        }
      };
    }
  }

  getIceCandidate(event: any, clientServer: boolean) {
    if (event.candidate) {
      if (clientServer) {
        // Send the candidate to the remote peer
        this.socket.emit('createAnswer', {
          data: event.candidate,
          id: this.room.id,
          key: this.key,
          camDesktop: this.camDesktop,
          usuarioOrigen:
            this.element.usuario1.id === this.usuarioSesion.id
              ? this.element.usuario1
              : this.element.usuario2,
          usuarioDestino:
            this.element.usuario1.id === this.usuarioSesion.id
              ? this.element.usuario2
              : this.element.usuario1,
        });
      } else {
        this.socket.emit('sendAnswer', {
          data: event.candidate,
          id: this.room.id,
          key: this.key,
          camDesktop: this.camDesktop,
          usuarioOrigen:
            this.element.usuario1.id === this.usuarioSesion.id
              ? this.element.usuario1
              : this.element.usuario2,
          usuarioDestino:
            this.element.usuario1.id === this.usuarioSesion.id
              ? this.element.usuario2
              : this.element.usuario1,
        });
      }
    }
  }
  /**
   * función que recive los track
   * @param ev
   */
  getRemoteStream(ev: any) {
    try {
      if (ev.streams && ev.streams.length > 0) {
        for (const element of ev.streams) {
          this.video.video.srcObject = element;
          this.video.stream = element;
        }
      } else {
        const inboundStream = new MediaStream(ev.track);
        this.video.video.srcObject = inboundStream;
        this.video.stream = inboundStream;
      }
    } catch (error) {}
  }

  /**
   * función que actualiza el esado de los botones
   */
  actualizarVideoBoton() {
    if (this.camDesktop) {
      this.videoBoton.desktop = this.video.videoCam;
    } else {
      this.videoBoton.video = this.video.videoCam;
      this.videoBoton.audio = this.video.audio;
      this.videoBoton.latencia = this.video.audio;
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
  /**
   * función que crea las offer de los peer antes de ser enviada para los demas clientes
   * @param addtrack
   */
  async startCamDesktop(addtrack: boolean) {
    let stream = null;
    if (addtrack) {
      stream = this.video.stream;
    }
    if (
      !Util.empty(this.room) &&
      !Util.empty(this.room.usuarios) &&
      Object.keys(this.room.usuarios).length > 0
    ) {
      const emiRecep = this.camDesktop
        ? this.room.peerServerEmisorReceptorDesktop
        : this.room.peerServerEmisorReceptor;
      for (const key in emiRecep) {
        if (
          emiRecep[key].usuario1.id === this.usuarioSesion.id ||
          emiRecep[key].usuario2.id === this.usuarioSesion.id
        ) {
          if (addtrack && !Util.empty(stream)) {
            for (const track of stream.getTracks()) {
              emiRecep[key].peerServer.peerConnection.addTrack(track, stream);
            }
          }
          await emiRecep[key].peerServer.createOffer();
          this.socket.emit('createAnswer', {
            data: emiRecep[key].peerServer.localDescription,
            id: this.room.id,
            key,
            camDesktop: this.camDesktop,
            usuarioOrigen:
              emiRecep[key].usuario1.id === this.usuarioSesion.id
                ? emiRecep[key].usuario1
                : emiRecep[key].usuario2,
            usuarioDestino:
              emiRecep[key].usuario1.id === this.usuarioSesion.id
                ? emiRecep[key].usuario2
                : emiRecep[key].usuario1,
          });
          this.socket.addRoom$(this.room);
          this.socket.addListen(true);
        }
      }
      this.socket.addRoom$(this.room);
      this.socket.addListen(true);
    }
  }
  /**
   * función que inicializa el envío de track para los demas clientes
   * @param addtrack
   * @param starDual
   */
  async start(addtrack: boolean) {
    await this.startCamDesktop(addtrack);
  }
  /**
   * hilo de escucha de los botones, simulación de click de botones fixed en la pantalla a traves del servicio
   */
  listenBotones() {
    this.botones.get().subscribe(async (data) => {
      if (!Util.empty(data) && this.esComponenteItem) {
        if (this.camDesktop) {
          switch (data) {
            case Util.desktop:
              this.visible = false;
              this.htmlListVideo.redimensionar = true;
              this.htmlListVideo.contVisibleDesktop = this.buscarDesktopMultimedia();
              this.video.stop();
              await this.video.startVideo();
              this.actualizarVideoBoton();
              this.sendInfoBotones();
              await this.start(true);
              break;

            case Util.stopDesktop:
              if (this.htmlListVideo.redimensionarPPT) {
                if (!Util.empty(this.htmlListVideo.ppt)) {
                  for (const key in this.htmlListVideo.ppt.integrantes) {
                    if (
                      this.htmlListVideo.ppt.integrantes[key].id ===
                        this.usuarioSesion.id ||
                      this.usuarioSesion.rol.tipo === 'PR'
                    ) {
                      this.htmlListVideo.redimensionarPPT = false;
                      break;
                    }
                  }
                }
              } else {
                this.visible = true;
                this.htmlListVideo.redimensionar =
                  this.buscarDesktopMultimedia() > 0;
                this.video.videoCam = !this.video.videoCam;
                this.actualizarVideoBoton();
                this.sendInfoBotones();
                this.video.stop();
              }
              break;
          }
        } else {
          switch (data) {
            case Util.video:
              this.video.stop();
              await this.video.startVideo();
              this.actualizarVideoBoton();
              this.sendInfoBotones();
              await this.start(true);
              this.usuarioSesion.boton.video = this.video.videoCam;
              this.room.usuarios[this.usuarioSesion.id].boton = this.usuarioSesion.boton;
              this.socket.emit('recibirBotonesS', {
                id: this.room.id,
                usuario: this.room.usuarios[this.usuarioSesion.id],
              });
              break;

            case Util.audio:
              if (
                !Util.empty(this.video.stream) &&
                !Util.empty(this.video.stream.getAudioTracks()) &&
                this.video.stream.getAudioTracks().length > 0
              ) {
                await this.video.startMic();
                this.actualizarVideoBoton();
                this.sendInfoBotones();
              } else {
                await this.video.startMic();
                this.actualizarVideoBoton();
                this.sendInfoBotones();
                await this.start(true);
              }
              this.usuarioSesion.boton.audio = this.video.audio;
              this.room.usuarios[this.usuarioSesion.id].boton = this.usuarioSesion.boton;
              console.log('antes de enviar............................');
              console.log(this.room.usuarios[this.usuarioSesion.id]);
              this.socket.emit('recibirBotonesS', {
                id: this.room.id,
                usuario: this.room.usuarios[this.usuarioSesion.id],
              });
              break;

            case Util.mano:
              this.usuarioSesion.boton.mano = !this.usuarioSesion.boton.mano;
              this.room.usuarios[this.usuarioSesion.id].boton = this.usuarioSesion.boton;
              this.socket.emit('recibirBotonesS', {
                id: this.room.id,
                usuario: this.room.usuarios[this.usuarioSesion.id],
              });
              break;
          }
        }
      }
    });
  }
  /**
   * función que busca los elementos visibles y elemento principal visible dsktopComponentMultimedia
   */
  buscarDesktopMultimedia() {
    let cont = 0;
    // tslint:disable-next-line: prefer-for-of
    for (
      let index = 0;
      index < this.listContentDesktop.toArray().length;
      index++
    ) {
      // tslint:disable-next-line: one-variable-per-declaration
      const element: DesktopMultimediaComponent = this.listContentDesktop.toArray()[
        index
      ] as DesktopMultimediaComponent;
      if (!element.visible) {
        cont++;
      }
    }
    if (!Util.empty(this.htmlVideoDesktop)) {
      if (!this.htmlVideoDesktop.visible) {
        cont++;
      }
    } else {
      if (!this.visible) {
        cont++;
      }
    }

    return cont;
  }

  sendInfoBotones() {
    if (
      (!Util.empty(this.listContentDesktop) &&
        !Util.empty(this.listContentDesktop.toArray())) ||
      (!Util.empty(this.listVideoMultimedia) &&
        !Util.empty(this.listVideoMultimedia.toArray()))
    ) {
      for (const element of this.camDesktop
        ? this.listContentDesktop.toArray()
        : this.listVideoMultimedia.toArray()) {
        if (element.channel) {
          element.peerServer.send(JSON.stringify(this.videoBoton));
        }
      }
    }
  }
}
