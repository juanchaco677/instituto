import { ListVideoComponent } from './../../chat/list-video/list-video.component';
import { Room } from './../../../model/room';
import { Sesion } from 'src/app/utils/sesion';
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
  EventEmitter,
  Output,
  QueryList,
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
  @Input() peerServer: PeerServer;
  @Input() peerClient: PeerClient;
  @Input() activo: boolean;
  @Input() usuario: Usuario;
  @Input() visible: boolean;
  @Input() listContentDesktop: QueryList<DesktopMultimediaComponent>;
  @Input() htmlListVideo: ListVideoComponent;
  usuarioSesion: Usuario;
  videoBoton: VideoBoton = new VideoBoton(false, false, false, false);
  video: Video;
  room: Room;
  @Output() emit = new EventEmitter();
  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    if (!Util.empty(el)) {
      this.video = new Video(2, el.nativeElement);
    }
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
        this.htmlListVideo.redimensionar = true;
        this.htmlListVideo.cdr.detectChanges();
      }
      if (
        this.listContentDesktop.toArray().length > 0 &&
        contAux !== 0 &&
        this.listContentDesktop.toArray().length === contAux
      ) {
        this.htmlListVideo.redimensionar = false;
        this.htmlListVideo.cdr.detectChanges();
      }
      this.visible = this.videoBoton.desktop ? false : true;
      this.cdr.detectChanges();
    };
  }

  ngOnDestroy(): void {}
}
