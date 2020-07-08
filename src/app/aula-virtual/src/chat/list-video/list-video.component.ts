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
      this.socket.addListen(true);
      for (const elementIn of data) {
        for (const element of this.room.peerServerEmisorReceptor) {
          if (
            (elementIn.usuario1.id === Sesion.userAulaChat().id ||
              elementIn.usuario2.id === Sesion.userAulaChat().id) &&
            (element.usuario1.id === Sesion.userAulaChat().id ||
              element.usuario2.id === Sesion.userAulaChat().id) &&
            elementIn.usuario1.id === element.usuario1.id &&
            elementIn.usuario2.id === element.usuario2.id
          ) {
            elementIn.peerClient = new PeerClient();
            await element.peerClient.createAnswer(
              elementIn.peerServer.localDescription
            );
            elementIn.peerClient.localDescription =
              element.peerClient.localDescription;
          }
        }
      }
      this.socket.addListen(true);
      this.socket.emit('sendAnswer', {
        id: this.room.id,
        peerServerEmisorReceptor: data,
      });
    });

    /**
     * recibiendo en el servidor las respuestas de los client answer
     * esto para conectarlos
     */
    this.socket.$sendAnswer.subscribe(async (data) => {
      this.socket.addListen(true);
      for (const elementIn of data) {
        for (const element of this.room.peerServerEmisorReceptor) {
          if (
            (elementIn.usuario1.id === Sesion.userAulaChat().id ||
              elementIn.usuario2.id === Sesion.userAulaChat().id) &&
            (element.usuario1.id === Sesion.userAulaChat().id ||
              element.usuario2.id === Sesion.userAulaChat().id) &&
            elementIn.usuario1.id === element.usuario1.id &&
            elementIn.usuario2.id === element.usuario2.id
          ) {
            await element.peerServer.addAnswer(
              elementIn.peerClient.localDescription
            );
          }
        }
      }
    });
  }
}
