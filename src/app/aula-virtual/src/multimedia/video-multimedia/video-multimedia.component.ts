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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-video-multimedia',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './video-multimedia.component.html',
  styleUrls: ['./video-multimedia.component.css'],
})
export class VideoMultimediaComponent implements OnInit {
  @Input() width: string;
  @Input() height: string;
  @Input() tipo: string = null;
  @Input() transmiteRecive: boolean;
  @Input() peerServer: PeerServer;
  @Input() peerClient: PeerClient;
  @Input() peerServerD: PeerServer;
  @Input() peerClientD: PeerClient;
  @Input() activo: boolean;
  @Input() usuario: Usuario;
  usuarioSesion: Usuario;
  videoBoton: VideoBoton = new VideoBoton(false, false, false, false);
  message: string;
  texto: string;
  video: Video;
  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    this.video = new Video(1, el.nativeElement);
  }
  @Output() emitClickDesktop = new EventEmitter();
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
  getOnDataChannel(event: any) {
    this.peerServer.receiveChannel = event.channel;
    this.peerServer.receiveChannel.onmessage = (e: any) => {
      this.videoBoton = JSON.parse(e.data);
      this.cdr.detectChanges();
    };
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
        this.cdr.detectChanges();
      };
    }
  }

  emit(event: boolean){
    this.emitClickDesktop.emit(event);
  }
}
