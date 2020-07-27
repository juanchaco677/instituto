import { DualMultimedia } from './../dual-multimedia';
import { BotonesService } from './../../../service/botones.service';
import { Util } from './../../../../utils/util';
import { SocketIoClientService } from './../../../service/socket-io-client.service';

import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
  DoCheck,
} from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-desktop-multimedia',
  templateUrl: './desktop-multimedia.component.html',
  styleUrls: ['./desktop-multimedia.component.css'],
})
export class DesktopMultimediaComponent extends DualMultimedia
  implements OnInit, OnDestroy, OnChanges {
  constructor(
    public socket: SocketIoClientService,
    public botones: BotonesService
  ) {
    super(true, socket, botones);
  }
  // ngDoCheck(): void {
  //   this.listenPeer();
  // }

  ngOnChanges(): void {
    this.listenPeer();
  }
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
