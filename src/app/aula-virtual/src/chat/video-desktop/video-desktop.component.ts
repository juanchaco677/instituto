import { PeerServerEmisorReceptor } from './../../../model/peer-server-emisor-receptor';
import { Usuario } from './../../../model/usuario';
import { Sesion } from 'src/app/utils/sesion';
import { Session } from 'protractor';
import { Util } from './../../../../utils/util';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { PeerClient } from 'src/app/aula-virtual/model/peer-client';
declare var Peer: any;
@Component({
  selector: 'app-video-desktop',
  templateUrl: './video-desktop.component.html',
  styleUrls: ['./video-desktop.component.css']
})
export class VideoDesktopComponent implements OnInit {

  room: Room = new Room();
  usuario: Usuario;
  constructor(
    private socket: SocketIoClientService
  ) {
    this.usuario = Sesion.userAulaChat();
  }

  ngOnInit(): void {
    if (!Util.empty(this.socket.room$)) {
      this.socket.getRoom$().subscribe(data => this.room = data);
    }
    /**
     * recibiendo el offer en el cliente para que este cree la respuesta
     */
    this.socket.$createAnswer.subscribe(async (data) => {

    //   for (const emiRecep of data) {
    //     if (this.usuario.id === emiRecep.receptor.id) {
    //       emiRecep.peerClient = new PeerClient();
    //       await emiRecep.peerClient.createAnswer(emiRecep.peerServer.peerConnection.localDescription);
    //     }
    //   }
    //   this.socket.emit('sendAnswer', data);
    //   this.room.peerServerEmisorReceptor.splice(0, this.room.peerServerEmisorReceptor.length);
    //   this.room.peerServerEmisorReceptor = this.room.peerServerEmisorReceptor.concat(data);

    });

    /**
     * recibiendo en el servidor las respuestas de los client answer
     * esto para conectarlos
     */
    this.socket.$sendAnswer.subscribe(async (data) => {

      // for (const emiRecep of data) {
      //   if (this.usuario.id === emiRecep.emisor.id) {
      //     emiRecep.peerServer.addAnswer(emiRecep.peerClient.peerConnection.localDescription);
      //   }
      // }
      // this.room.peerServerEmisorReceptor.splice(0, this.room.peerServerEmisorReceptor.length);
      // this.room.peerServerEmisorReceptor = this.room.peerServerEmisorReceptor.concat(data);
    });
  }

}
