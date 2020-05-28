import { DisplayMediaComponent } from './../../multimedia/display-media/display-media.component';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { Sesion } from '../../../../utils/sesion';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
declare var Peer: any;
@Component({
  selector: 'app-video-desktop',
  templateUrl: './video-desktop.component.html',
  styleUrls: ['./video-desktop.component.css']
})
export class VideoDesktopComponent implements OnInit {
  startDesktop = true;
  alias: string;
  tipo: string;
  profesorT: any;
  profesorR: any;
  usuarios: Usuario [];
  @ViewChild('display')diplay: DisplayMediaComponent;
  @Output() sidenav = new EventEmitter();
  constructor(
    private socket: SocketIoClientService
  ) {
    this.alias = Sesion.user().nombre.substr( 0 , 1 );
    this.tipo = Sesion.user().rol.tipo;
  }

  ngOnInit(): void {

  }

  hidden(){
    this.startDesktop = !this.startDesktop;
  }

  openClose(){
    this.sidenav.emit(null);
  }
}
