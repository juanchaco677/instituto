import { Sesion } from './../../../../utils/sesion';
import { Usuario } from './../../../model/usuario';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { ListVideoComponent } from './../../chat/list-video/list-video.component';
import { Room } from './../../../model/room';
import { PPT } from './../../../model/ppt';
import { Util } from 'src/app/utils/util';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-presentacion-ppt',
  templateUrl: './presentacion-ppt.component.html',
  styleUrls: ['./presentacion-ppt.component.css'],
})
export class PresentacionPPTComponent implements OnInit, OnChanges {
  @Input() height: string;
  @Input() width: string;
  @Input() ppt: PPT;
  @Input() room: Room;
  @Input() listVideo: ListVideoComponent;
  srcPath: string;
  atr = false;
  sig = false;
  usuario: Usuario;
  visibleBtn = false;
  constructor(private socketService: SocketIoClientService) {
    this.srcPath = Util.apiUrlImage;
    this.usuario = Sesion.userAulaChat();
  }
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    console.log('ver el ppt');
    console.log(this.ppt);
    this.visibleBtn = this.restriccion();
  }

  ngOnInit(): void {}

  siguiente() {
    this.ppt.pagAct++;
    if (this.ppt.pagAct <= this.ppt.pagTot) {
      if (this.ppt.pagAct === this.ppt.pagTot) {
        this.ppt.pagAct = this.ppt.pagTot;
        this.sig = true;
      } else {
        this.sig = false;
      }
    } else {
      this.ppt.pagAct = this.ppt.pagTot;
      this.sig = true;
    }
    if (this.ppt.pagAct <= 0) {
      this.ppt.pagAnt = 0;
    } else {
      this.ppt.pagAnt = this.ppt.pagAct - 1;
    }
    this.ppt.pagSig = this.ppt.pagAct;
    this.socketService.emit('recibePaginationS', this.ppt);
  }

  atras() {
    this.ppt.pagAct--;
    if (this.ppt.pagAct >= 0) {
      if (this.ppt.pagAct === 0) {
        this.ppt.pagAct = 0;
        this.atr = true;
      } else {
        this.atr = false;
      }
    } else {
      this.ppt.pagAct = 0;
      this.atr = true;
    }
    if (this.ppt.pagSig === this.ppt.pagTot) {
      this.ppt.pagSig = this.ppt.pagTot;
    } else {
      this.ppt.pagSig = this.ppt.pagAct + 1;
    }
    this.ppt.pagAnt = this.ppt.pagAct;
    this.socketService.emit('recibePaginationS', this.ppt);
  }

  restriccion() {
    if (!this.ppt.todos) {
      for (const key in this.ppt.integrantes) {
        if (this.ppt.integrantes[key].id === this.usuario.id) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  }
}
