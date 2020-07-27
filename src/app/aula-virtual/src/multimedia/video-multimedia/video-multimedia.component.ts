import { DualMultimedia } from './../dual-multimedia';
import { BotonesService } from './../../../service/botones.service';
import { Util } from './../../../../utils/util';
import { SocketIoClientService } from './../../../service/socket-io-client.service';

import {
  Component,
  OnInit,
  OnDestroy,
  DoCheck,
  OnChanges,
} from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-video-multimedia',
  templateUrl: './video-multimedia.component.html',
  styleUrls: ['./video-multimedia.component.css'],
})
export class VideoMultimediaComponent extends DualMultimedia
  implements OnInit, OnDestroy, OnChanges {
  constructor(
    public socket: SocketIoClientService,
    public botones: BotonesService
  ) {
    super(false, socket, botones);
  }
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.listenPeer();
  }

  // ngDoCheck(): void {
  //   this.listenPeer();
  // }

  ngOnInit(): void {
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
        if (this.afterCont) {
          this.afterCont = false;
          this.start(false, true);
        }
      }
    });
    this.listenPeer();

    this.socket.getListenAudio().subscribe((data) => {
      if (data) {
        if (!Util.empty(data) && !Util.empty(this.video)) {
          this.videoBoton.video = this.video.videoCam;
          this.videoBoton.audio = this.video.audio;
          if (this.videoBoton.audio) {
            this.listeAudio();
          }
        }
      }
    });
    this.socket.$refreshUsuario.subscribe((data) => {
      if (data) {
        if (this.video.video || this.video.audio) {
          this.start(true, true);
          this.worker.postMessage({});
        }
      }
    });
    this.initWebWorker();
    this.start(false, true);
    this.listenBotones();
  }

  ngOnDestroy(): void {
    this.worker.terminate();
  }
}
