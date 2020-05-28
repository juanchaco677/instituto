import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { DisplayMediaComponent } from './../../display-media/display-media.component';
import { Sesion } from './../../../../../utils/sesion';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
declare var Peer: any;
@Component({
  selector: 'app-display-button',
  templateUrl: './display-button.component.html',
  styleUrls: ['./display-button.component.css']
})
export class DisplayButtonComponent implements OnInit {
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
