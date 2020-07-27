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
  @Input() htmlVideoDesktop: DesktopMultimediaComponent; // es necesario para completar el for del list video multimedia
  @Input() width: string; // ancho del componente
  @Input() height: string; // alto del componente
  @Input() peerServer: PeerServer; // peer server
  @Input() peerClient: PeerClient; // peer client
  @Input() usuario: Usuario;
  @Input() visible = true; // variable para el atributo hidden el componente
  @Input() htmlListVideo: ListVideoComponent;
  @Input() listContentDesktop: QueryList<DesktopMultimediaComponent>; // es el for que esta en el list video multimedia
  @Input() esComponenteItem: boolean; // variable que me dice si es un solo componenete o esta dentro de un for
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

  /**
   * función para escuchar la informacion track o datos que viene del servidor peer o client
   */
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

  /**
   * función que actualiza el esado de los botones
   */
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
      this.room.usuarios.length > 0
    ) {
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
  /**
   * función que inicializa el envío de track para los demas clientes
   * @param addtrack
   * @param starDual
   */
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
  /**
   *
   * @param camDesktop
   * @param data
   */
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
    emiRecep = await this.startAddUsuarioFor(false, data);
    emiRecepDesktop = await this.startAddUsuarioFor(true, data);
    this.socket.addRoom$(this.room);
    this.socket.addListen(true);
    this.socket.emit('createAnswer', {
      id: this.room.id,
      peerServerEmisorReceptor: emiRecep,
      peerServerEmisorReceptorDesktop: emiRecepDesktop,
    });
  }

  /**
   * enviar inforación referente a los botones del servidor para los cliente por el data channel
   */
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
  /**
   * función que recive la informacion de los botones de los servidor por el datachanel del peer
   * @param event
   */
  getOnDataChannel(event: any) {
    if (this.camDesktop) {
      this.peerServer.receiveChannel = event.channel;
      this.peerServer.receiveChannel.onmessage = (e: any) => {
        this.videoBoton = JSON.parse(e.data);
        console.log('data channel..');
        console.log(this.videoBoton);
        console.log(this.listContentDesktop.toArray().length);
        // let cont = 0;
        // let contAux = 0;
        // // tslint:disable-next-line: prefer-for-of
        // for (
        //   let index = 0;
        //   index < this.listContentDesktop.toArray().length;
        //   index++
        // ) {
        //   const element: DesktopMultimediaComponent = this.listContentDesktop.toArray()[
        //     index
        //   ] as DesktopMultimediaComponent;
        //   console.log(element);
        //   if (element.videoBoton.desktop) {
        //     cont++;
        //   }
        //   if (!element.videoBoton.desktop) {
        //     contAux++;
        //   }
        // }
        // if (
        //   this.listContentDesktop.toArray().length > 0 &&
        //   cont !== 0 &&
        //   this.listContentDesktop.toArray().length === cont
        // ) {
        //   console.log('..data channel true 1..');
        //   this.htmlListVideo.redimensionarItem++;
        //   this.htmlListVideo.redimensionar = true;
        // }
        // if (
        //   this.listContentDesktop.toArray().length > 0 &&
        //   contAux !== 0 &&
        //   this.listContentDesktop.toArray().length === contAux
        // ) {
        //   if (this.htmlVideoDesktop.visible) {
        //     console.log('..data channel false..');
        //     this.htmlListVideo.redimensionarItem = 0;
        //     this.htmlListVideo.redimensionar = false;
        //   } else {
        //     console.log('..data channel true 2..');
        //     this.htmlListVideo.redimensionarItem++;
        //     this.htmlListVideo.redimensionar = true;
        //   }
        // }
        this.visible = this.videoBoton.desktop ? false : true;
        if (this.buscarDesktopMultimedia() > 0) {
          this.htmlListVideo.redimensionarItem++;
          this.htmlListVideo.redimensionar = true;
        } else {
          this.htmlListVideo.redimensionarItem = 0;
          this.htmlListVideo.redimensionar = false;
        }
      };
    } else {
      this.peerServer.receiveChannel = event.channel;
      this.peerServer.receiveChannel.onmessage = (e: any) => {
        this.videoBoton = JSON.parse(e.data);
      };
    }
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
              this.htmlListVideo.redimensionar = true;
              this.htmlListVideo.redimensionarItem++;
              this.visible = false;
              this.video.stop();
              await this.video.startVideo();
              this.video.stopBotonDisplayMedia();
              this.start(true, false);
              this.worker.postMessage({});
              this.actualizarVideoBoton();
              break;

            case Util.stopDesktop:
              const num: number = this.buscarDesktopMultimedia();
              this.htmlListVideo.redimensionar = num === 1 ? false : true;
              this.htmlListVideo.redimensionarItem =
                num === 1 ? 0 : this.htmlListVideo.redimensionarItem + 1;
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
}
