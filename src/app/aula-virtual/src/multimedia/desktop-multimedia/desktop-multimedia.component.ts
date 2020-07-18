import { Room } from './../../../model/room';
import { PeerServerEmisorReceptor } from './../../../model/peer-server-emisor-receptor';
import { Sesion } from 'src/app/utils/sesion';
import { VideoDesktopComponent } from './../../chat/video-desktop/video-desktop.component';
import { Usuario } from './../../../model/usuario';
import { VideoBoton } from './../../../model/video-boton';
import { Util } from './../../../../utils/util';
import { SocketIoClientService } from './../../../service/socket-io-client.service';
import { PeerClient } from './../../../model/peer-client';
import { PeerServer } from './../../../model/peer-server';
import { Video } from './../../../model/video';

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-desktop-multimedia',
  templateUrl: './desktop-multimedia.component.html',
  styleUrls: ['./desktop-multimedia.component.css'],
})
export class DesktopMultimediaComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() width: string;
  @Input() height: string;
  @Input() tipo: string = null;
  @Input() transmiteRecive: boolean;
  @Input() peerServer: PeerServer;
  @Input() peerClient: PeerClient;
  @Input() activo: boolean;
  @Input() usuario: Usuario;
  usuarioSesion: Usuario;
  videoBoton: VideoBoton = new VideoBoton(false, false, false, false);
  message: string;
  texto: string;
  video: Video;
  videoDesktop: Video;
  @Input() visible: boolean;
  room: Room;
  worker: Worker;
  contador = 0;
  hilo = true;
  aux = 0;
  heightResize: number;
  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    this.video = new Video(2, el.nativeElement);
  }

  constructor(
    private socket: SocketIoClientService,
    private cdr: ChangeDetectorRef
  ) {
    this.usuarioSesion = Sesion.userAulaChat();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges() {
    this.listenPeer();
  }
  ngOnInit(): void {
    this.socket.getRoom$().subscribe((data) => (this.room = data));
    this.initWebWorker();
    this.listenPeer();
  }

  listenPeer() {
    this.socket.listen$.subscribe((data) => {
      if (data && !Util.empty(this.peerServer)) {
        this.peerServer.peerConnection.ontrack = this.getRemoteStream.bind(
          this
        );
        this.peerServer.peerConnection.ondatachannel = this.getOnDataChannel.bind(
          this
        );
      }
      if (data && !Util.empty(this.peerClient)) {
        this.peerClient.peerConnection.ontrack = this.getRemoteStream.bind(
          this
        );
        this.peerClient.peerConnection.ondatachannel = this.getOnDataChannel.bind(
          this
        );
      }
    });
  }
  getRemoteStream(ev: any) {
    try {
      this.visible = false;
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

  getOnDataChannel(event: any) {
    this.peerServer.receiveChannel = event.channel;
    this.peerServer.receiveChannel.onmessage = (e: any) => {
      this.videoBoton = JSON.parse(e.data);
      this.cdr.detectChanges();
    };
  }

  async startVideo() {
    this.video.stop();
    await this.video.startVideo();
    this.start(true);
    this.worker.postMessage({});
  }

  async start(addtrack: boolean) {
    let stream = null;
    if (addtrack) {
      stream = this.video.stream;
    }
    if (
      !Util.empty(this.room) &&
      !Util.empty(this.room.usuarios) &&
      this.room.usuarios.length > 0
    ) {
      this.socket.addListen(true);
      const emiRecep: PeerServerEmisorReceptor[] = [];
      for (const element of this.room.peerServerEmisorReceptorDesktop) {
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
          this.socket.addListen(true);
        }
      }

      this.socket.addRoom$(this.room);
      this.socket.emit('createAnswer', {
        camDesktop: true, // desktop
        id: this.room.id,
        peerServerEmisorReceptor: emiRecep,
      });
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

  sendInfoBotones() {
    const emiRecep: PeerServerEmisorReceptor[] = [];
    for (const element of this.room.peerServerEmisorReceptorDesktop) {
      if (
        element.usuario1.id === this.usuarioSesion.id ||
        element.usuario2.id === this.usuarioSesion.id
      ) {
        element.videoBoton.desktop = this.video.videoDesktop;
        emiRecep.push(element);
      }
    }
    for (const element of emiRecep) {
      if (element.peerServer.dataChannel.readyState === 'open') {
        this.contador++;
        element.peerServer.send(
          JSON.stringify({
            desktop: this.video.videoDesktop,
          })
        );
      }
    }
    if (this.contador === emiRecep.length) {
      this.hilo = false;
      this.contador = 0;
    }
  }

  ngOnDestroy(): void {
    this.worker.terminate();
  }
}
