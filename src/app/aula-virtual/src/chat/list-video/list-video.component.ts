import { VideoMultimediaComponent } from './../../multimedia/video-multimedia/video-multimedia.component';
import { ProgramacionHorario } from './../../../../dashboard/modelo/programacion-horario';
import { Usuario } from './../../../model/usuario';
import { Sesion } from 'src/app/utils/sesion';
import { Util } from './../../../../utils/util';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PeerClient } from 'src/app/aula-virtual/model/peer-client';
import { PeerServer } from 'src/app/aula-virtual/model/peer-server';
@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css'],
})
export class ListVideoComponent implements OnInit {
  room: Room = new Room();
  usuario: Usuario;
  programacion: ProgramacionHorario;
  peerServer: PeerServer;
  @Input() contador = 0;
  @ViewChild('videoHtml') videoHtml: VideoMultimediaComponent;
  constructor(private socket: SocketIoClientService) {
    this.usuario = Sesion.userAulaChat();
  }

  ngOnInit(): void {
    this.socket
      .getProgramacion$()
      .subscribe((data) => (this.programacion = data));

    if (!Util.empty(this.socket.room$)) {
      this.socket.getRoom$().subscribe((data) => (this.room = data));
    }
    /**
     * recibiendo el offer en el cliente para que este cree la respuesta
     */
    this.socket.$createAnswer.subscribe(async (data) => {
      console.log('create answer');
      console.log(data);
      for (const elementIn of data) {
        for (const element of this.room.peerServerEmisorReceptor) {
          if (
            this.usuario.id === elementIn.receptor.id &&
            elementIn.receptor.id === element.receptor.id &&
            elementIn.emisor.id === element.emisor.id &&
            !Util.empty(elementIn.peerServer.localDescription)
          ) {
            await element.peerClient.createAnswer(
              elementIn.peerServer.localDescription
            );
            element.peerServer = elementIn.peerServer;
            elementIn.peerClient.localDescription = element.peerClient.localDescription;
          }
        }
      }
      // this.socket.getRoom$().subscribe(async (room: Room) => {
      //   this.room = room;
      //   for (const emiRecep of this.room.peerServerEmisorReceptor) {
      //     if (this.usuario.id === emiRecep.receptor.id) {
      //       await emiRecep.peerClient.createAnswer(
      //         emiRecep.peerServer.localDescription
      //       );
      //     }
      //   }
      this.socket.emit('sendAnswer', { id: this.room.id, peerServerEmisorReceptor: data });
      //   console.log(this.room);
      // });
    });

    /**
     * recibiendo en el servidor las respuestas de los client answer
     * esto para conectarlos
     */
    this.socket.$sendAnswer.subscribe(async (data) => {
      console.log('send answer');
      console.log(data);
      for (const elementIn of data) {
        for (const element of this.room.peerServerEmisorReceptor) {
          if (
            this.usuario.id === elementIn.emisor.id &&
            elementIn.emisor.id === element.emisor.id &&
            elementIn.receptor.id === element.receptor.id &&
            !Util.empty(elementIn.peerClient.localDescription)
          ) {
            element.peerServer.addAnswer(elementIn.peerClient.localDescription);
            element.peerClient = elementIn.peerClient;
          }
        }
      }

      // this.socket.addRoom$(data);
      // this.socket.getRoom$().subscribe(async (room: Room) => {
      //   this.room = room;
      //   for (const emiRecep of this.room.peerServerEmisorReceptor) {
      //     if (this.usuario.id === emiRecep.emisor.id) {
      //       emiRecep.peerServer.addAnswer(emiRecep.peerClient.localDescription);
      //     }
      //   }
      //   console.log(this.room);
      // });
    });
  }

  // buscarPeerServerTransmitir(){
  //   this.socket.getRoom$().subscribe(data =>{
  //     for (const element of data.peerServerEmisorReceptor) {
  //       if( this.usuario.id === element.emisor.id){
  //         this.peerServer = element.peerServer;
  //       }
  //     }
  //   });
  //   return null;
  // }
}
