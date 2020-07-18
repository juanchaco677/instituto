import { DesktopMultimediaComponent } from './../../multimedia/desktop-multimedia/desktop-multimedia.component';
import { PeerServerEmisorReceptor } from './../../../model/peer-server-emisor-receptor';
import { Chat } from './../../../model/inscripcion-asignatura';
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
import { VideoBoton } from 'src/app/aula-virtual/model/video-boton';
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
  @Input() visible = true;
  @Input() contador = 0;
  @ViewChild('videoHtml') videoHtml: VideoMultimediaComponent;
  @ViewChild('desktopHtml') desktopHtml: DesktopMultimediaComponent;
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
      this.socket.addListen(true);

      let usuarioOrigen = new Usuario();
      const emipRecep: PeerServerEmisorReceptor[] = [];
      for (const elementIn of data.peerServerEmisorReceptor) {
        for (const element of !data.camDesktop
          ? this.room.peerServerEmisorReceptor
          : this.room.peerServerEmisorReceptorDesktop) {
          if (
            (elementIn.usuario1.id === Sesion.userAulaChat().id ||
              elementIn.usuario2.id === Sesion.userAulaChat().id) &&
            (element.usuario1.id === Sesion.userAulaChat().id ||
              element.usuario2.id === Sesion.userAulaChat().id) &&
            elementIn.usuario1.id === element.usuario1.id &&
            elementIn.usuario2.id === element.usuario2.id
          ) {
            usuarioOrigen =
              elementIn.usuario1.id === Sesion.userAulaChat().id
                ? elementIn.usuario2
                : elementIn.usuario1;

            elementIn.peerClient = new PeerClient();
            await element.peerClient.createAnswer(
              elementIn.peerServer.localDescription
            );
            elementIn.peerClient.localDescription =
              element.peerClient.localDescription;
            emipRecep.push(elementIn);
          }
        }
      }
      this.socket.addListen(true);
      this.socket.emit('sendAnswer', {
        camDesktop: data.camDesktop,
        id: this.room.id,
        usuarioOrigen,
        peerServerEmisorReceptor: emipRecep,
      });
    });

    /**
     * recibiendo en el servidor las respuestas de los client answer
     * esto para conectarlos
     */
    this.socket.$sendAnswer.subscribe(async (data) => {
      this.socket.addListen(true);
      for (const elementIn of data.peerServerEmisorReceptor) {
        for (const element of !data.camDesktop
          ? this.room.peerServerEmisorReceptor
          : this.room.peerServerEmisorReceptorDesktop) {
          if (
            (elementIn.usuario1.id === Sesion.userAulaChat().id ||
              elementIn.usuario2.id === Sesion.userAulaChat().id) &&
            (element.usuario1.id === Sesion.userAulaChat().id ||
              element.usuario2.id === Sesion.userAulaChat().id) &&
            elementIn.usuario1.id === element.usuario1.id &&
            elementIn.usuario2.id === element.usuario2.id
          ) {
            if (!Util.empty(elementIn.peerClient.localDescription)) {
              await element.peerServer.addAnswer(
                elementIn.peerClient.localDescription
              );
            }
          }
        }
      }
    });

    this.socket.$addUsuario.subscribe((data) => {
      if (Util.empty(this.room.peerServerEmisorReceptor)) {
        this.room.peerServerEmisorReceptor = [];
      }
      for (const element of data.peerServerEmisorReceptor) {
        element.peerServer = new PeerServer();
        element.peerClient = new PeerClient();
        element.videoBoton = new VideoBoton(false, false);
        element.peerServer.createDataChannel('botones');
        element.peerClient.createDataChannel('botones');
        this.room.peerServerEmisorReceptor.push(element);
      }
      this.room.id = data.id;
      if (Util.empty(this.room.usuarios)) {
        this.room.usuarios = [];
      }
      if (Util.empty(this.room.chat)) {
        this.room.chat = [];
      }
      this.room.usuarios.push(data.usuario);
      this.room.chat = data.chat.concat(this.room.chat);
      this.socket.addRoom$(this.room);
    });
  }
  emit(event: boolean) {
    this.visible = event;
    if (!Util.empty(this.visible) && !this.visible) {
      this.desktopHtml.startVideo();
    }
  }
}
