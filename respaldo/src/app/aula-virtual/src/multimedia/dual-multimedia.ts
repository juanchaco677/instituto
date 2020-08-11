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
  @Input() element: PeerServerEmisorReceptor;
  @Input() key: string;
  @Input() listContentDesktop: QueryList<DesktopMultimediaComponent>; // es el for que esta en el list video multimedia
  @Input() esComponenteItem: boolean; // variable que me dice si es un solo componenete o esta dentro de un for
  usuarioSesion: Usuario;
  @Output() videoBoton: VideoBoton;
  video: Video;
  room: Room;

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

  /**
   * función para escuchar la informacion track o datos que viene del servidor peer o client
   */
  listenPeer() {
    this.socket.listen$.subscribe((data) => {
      if (!Util.empty(data) && data && !Util.empty(this.peerServer)) {
        // tslint:disable-next-line: no-shadowed-variable
        this.peerServer.peerConnection.on('signal', (data: any) => {
          if (this.peerServer.gotAnswer) {
            this.peerServer.sendDataPeer(
              data,
              this.room.id,
              this.key,
              this.camDesktop,
              this.element.usuario1.id === this.usuarioSesion.id
                ? this.element.usuario1
                : this.element.usuario2,
              this.element.usuario1.id === this.usuarioSesion.id
                ? this.element.usuario2
                : this.element.usuario1
            );
          }
        });

        this.peerServer.peerConnection.on('stream', this.getRemoteStream);
        this.peerServer.peerConnection.on('data', this.getOnDataChannel);
        this.peerServer.peerConnection.on('close', () =>
          this.peerServer.peerConnection.destroy()
        );
        this.peerServer.peerConnection.on('connect', () => console.log('DATA CHANNEL CONNECT SERVER'));
      }
      if (!Util.empty(data) && data && !Util.empty(this.peerClient)) {
        // tslint:disable-next-line: no-shadowed-variable
        this.peerClient.peerConnection.on('signal', (data: any) =>
          this.peerClient.sendDataPeer(
            data,
            this.room.id,
            this.key,
            this.camDesktop,
            this.element.usuario1.id === this.usuarioSesion.id
              ? this.element.usuario1
              : this.element.usuario2,
            this.element.usuario1.id === this.usuarioSesion.id
              ? this.element.usuario2
              : this.element.usuario1
          )
        );
        this.peerClient.peerConnection.on('stream', this.getRemoteStream);
        this.peerClient.peerConnection.on('data', this.getOnDataChannel);
        this.peerClient.peerConnection.on('close', () =>
          this.peerClient.peerConnection.destroy()
        );

        this.peerClient.peerConnection.on('connect', () => console.log('DATA CHANNEL CONNECT CLIENT'));
      }
    });
  }

  /**
   * función que recive los track
   * @param ev
   */
  getRemoteStream(streams: any) {
    console.log('reciviendo....... stream.....');
    if (streams && streams.length > 0) {
      for (const element of streams) {
        this.video.video.srcObject = element;
        this.video.stream = element;
        this.listeAudio();
      }
    }
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
  startCamDesktop(addtrack: boolean) {
    let stream = null;
    if (addtrack) {
      stream = this.video.stream;
    }
    if (
      !Util.empty(this.room) &&
      !Util.empty(this.room.usuarios) &&
      this.room.usuarios.length > 0
    ) {
      const elements = this.camDesktop
        ? this.room.peerServerEmisorReceptorDesktop
        : this.room.peerServerEmisorReceptor;
      for (const key in elements) {
        if (
          elements[key].usuario1.id === this.usuarioSesion.id ||
          elements[key].usuario2.id === this.usuarioSesion.id
        ) {
          // elements[key].peerServer.sendData('enviando informacion putos putos');
          elements[key].peerServer.peerConnection.addStream(stream);
        }
      }
    }
  }
  /**
   * función que inicializa el envío de track para los demas clientes
   * @param addtrack
   * @param starDual
   */
  start(addtrack: boolean) {
    this.startCamDesktop(addtrack);
  }
  /**
   * función que recive la informacion de los botones de los servidor por el datachanel del peer
   * @param event
   */
  getOnDataChannel(data: any) {
    console.log('reciviendo data channel..');
    this.videoBoton = JSON.parse(data);
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
              this.start(true);
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
              this.actualizarVideoBoton();
              break;
          }
        } else {
          switch (data) {
            case Util.video:
              this.video.stop();
              console.log('start');
              await this.video.startVideo();
              console.log('paso');
              this.start(true);
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
                this.start(true);
                this.listeAudio();
              }
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
