import { BotonesComponent } from './../../multimedia/botones/botones.component';
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
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
} from '@angular/core';
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
  redimensionar = false;
  @Input() visible = true;
  @Input() contador = 0;
  @ViewChild('videoHtml') videoHtml: VideoMultimediaComponent;
  @ViewChild('desktopHtml') desktopHtml: DesktopMultimediaComponent;
  @ViewChild('contenedor') contenedor: ElementRef;
  @ViewChild('boton') htmlBoton: BotonesComponent;
  @ViewChildren('contentDesktop') listContentDesktop: QueryList<
    DesktopMultimediaComponent
  >;
  constructor(
    private socket: SocketIoClientService,
    public cdr: ChangeDetectorRef
  ) {
    this.usuario = Sesion.userAulaChat();
  }

  async createAnswer(data: any) {
    this.socket.addListen(true);
    let usuarioOrigen = new Usuario();
    const emipRecep: PeerServerEmisorReceptor[] = [];
    const emipRecepDesktop: PeerServerEmisorReceptor[] = [];
    if (!Util.empty(data.peerServerEmisorReceptor)) {
      for (const elementIn of data.peerServerEmisorReceptor) {
        for (const element of this.room.peerServerEmisorReceptor) {
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
    }

    if (!Util.empty(data.peerServerEmisorReceptorDesktop)) {
      for (const elementIn of data.peerServerEmisorReceptorDesktop) {
        for (const element of this.room.peerServerEmisorReceptorDesktop) {
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
            emipRecepDesktop.push(elementIn);
          }
        }
      }
    }

    this.socket.emit('sendAnswer', {
      id: this.room.id,
      usuarioOrigen,
      peerServerEmisorReceptor: emipRecep,
      peerServerEmisorReceptorDesktop: emipRecepDesktop,
    });

    this.socket.addListen(true);
  }

  async addAnswer(data: any) {
    console.log('send answer');
    console.log(data);
    this.socket.addListen(true);
    if (!Util.empty(data.peerServerEmisorReceptor)) {
      for (const elementIn of data.peerServerEmisorReceptor) {
        for (const element of this.room.peerServerEmisorReceptor) {
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
    }
    if (!Util.empty(data.peerServerEmisorReceptorDesktop)) {
      for (const elementIn of data.peerServerEmisorReceptorDesktop) {
        for (const element of this.room.peerServerEmisorReceptorDesktop) {
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
    }
    this.socket.addListen(true);
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
    this.socket.$createAnswer.subscribe(async (data) =>
      this.createAnswer(data)
    );

    /**
     * recibiendo en el servidor las respuestas de los client answer
     * esto para conectarlos
     */
    this.socket.$sendAnswer.subscribe(async (data) => this.addAnswer(data));

    this.socket.$addUsuario.subscribe((data) => {
      if (Util.empty(this.room.peerServerEmisorReceptor)) {
        this.room.peerServerEmisorReceptor = [];
      }
      if (Util.empty(this.room.peerServerEmisorReceptorDesktop)) {
        this.room.peerServerEmisorReceptorDesktop = [];
      }
      for (const element of data.peerServerEmisorReceptor) {
        if (Util.empty(element.peerServer) && Util.empty(element.peerClient)) {
          element.peerServer = new PeerServer();
          element.peerClient = new PeerClient();
          element.videoBoton = new VideoBoton(true, false);
          element.peerServer.createDataChannel('botones');
          element.peerClient.createDataChannel('botones');
          this.room.peerServerEmisorReceptor.push(element);
        }
      }
      for (const element of data.peerServerEmisorReceptorDesktop) {
        if (Util.empty(element.peerServer) && Util.empty(element.peerClient)) {
          element.peerServer = new PeerServer();
          element.peerClient = new PeerClient();
          element.videoBoton = new VideoBoton(true, false);
          element.peerServer.createDataChannel('botones');
          element.peerClient.createDataChannel('botones');
          this.room.peerServerEmisorReceptorDesktop.push(element);
        }
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
      this.htmlBoton.room = this.room;
      this.htmlBoton.start(null, null, true);
      console.log('addUsuario');
      console.log(this.room);
    });
  }

  reciveEmit(event: boolean) {
    this.redimensionar = event;
  }
}
