import { Router } from '@angular/router';
import { DualMultimedia } from './../dual-multimedia';
import { BotonesService } from './../../../service/botones.service';
import { Util } from './../../../../utils/util';
import { SocketIoClientService } from './../../../service/socket-io-client.service';

import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  Input,
  ChangeDetectorRef,
} from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-video-multimedia',
  templateUrl: './video-multimedia.component.html',
  styleUrls: ['./video-multimedia.component.css'],
})
export class VideoMultimediaComponent
  extends DualMultimedia
  implements OnInit, OnDestroy, OnChanges {
  constructor(
    public socket: SocketIoClientService,
    public botones: BotonesService,
    public cdr: ChangeDetectorRef,
    public router: Router,
  ) {
    super(false, socket, botones, cdr , router);
  }
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.listenPeer();
  }

  ngOnInit(): void {
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
        if (
          this.esComponenteItem &&
          !Util.empty(this.room.usuarios[this.usuarioSesion.id].boton) &&
          !Util.empty(this.room.usuarios[this.usuarioSesion.id].boton.mano)
        ) {
          this.usuarioSesion.boton = this.room.usuarios[
            this.usuarioSesion.id
          ].boton;
          this.videoBoton = this.usuarioSesion.boton;
        }
      }
    });
    this.listenPeer();

    this.socket.$refreshUsuario.subscribe((data) => {
      if (data) {
        if (this.video.video || this.video.audio) {
          // this.start(true, true);
        }
      }
    });
    if (this.esComponenteItem) {
      this.listenBotones();
    }
  }

  ngOnDestroy(): void {}
}
