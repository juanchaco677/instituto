import { SocketIoClientService } from './../../../../service/socket-io-client.service';
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
  peer;
  @ViewChild('display')diplay: DisplayMediaComponent;
  @Output() sidenav = new EventEmitter();
  constructor(
  ) {
    this.alias = Sesion.user().nombre.substr( 0 , 1 );
    this.tipo = Sesion.user().rol.tipo;
    this.peer = new Peer('123');
  }

  ngOnInit(): void {
    // if(this.diplay.video || this.diplay.sound){
      // this.peer.on('call', call => {

      // }
    // }
  }
  hidden(){
    this.startDesktop = !this.startDesktop;
  }

  openClose(){
    this.sidenav.emit(null);
  }
}
