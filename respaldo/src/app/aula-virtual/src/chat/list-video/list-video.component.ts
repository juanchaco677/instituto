import { VideoMultimediaComponent } from './../../multimedia/video-multimedia/video-multimedia.component';
import { BotonesComponent } from './../../multimedia/botones/botones.component';
import { DesktopMultimediaComponent } from './../../multimedia/desktop-multimedia/desktop-multimedia.component';
import { PeerServerEmisorReceptor } from './../../../model/peer-server-emisor-receptor';
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
  room: Room;
  usuario: Usuario;
  programacion: ProgramacionHorario;
  peerServer: PeerServer;
  redimensionarItem = 0;
  redimensionar = false;
  @Input() visible = true;
  @Input() contador = 0;
  @ViewChild('videoHtml') videoHtml: VideoMultimediaComponent;
  @ViewChild('desktopHtml') desktopHtml: DesktopMultimediaComponent;
  @ViewChild('contenedor') contenedor: ElementRef;
  @ViewChild('boton') htmlBoton: BotonesComponent;
  @ViewChild('htmlVideoDesktop') htmlVideoDesktop: DesktopMultimediaComponent;
  @ViewChildren('contentDesktop') listContentDesktop: QueryList<
    DesktopMultimediaComponent
  >;
  constructor(public socket: SocketIoClientService) {
    this.room = new Room(null, [], [], [], []);
    this.usuario = Sesion.userAulaChat();
  }

  ngOnInit(): void {
    this.socket
      .getProgramacion$()
      .subscribe((data) => (this.programacion = data));
    /**
     * servicio socket para escuchar cuando se agrega la sala en la pantalla
     */
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data)) {
        this.room = data;
      }
    });
    /**
     * recibiendo el offer en el cliente para que este cree la respuesta
     */
    this.socket.$createAnswer.subscribe((data) => this.createAnswer(data));
    /**
     * recibiendo en el servidor las respuestas de los client answer
     * esto para conectarlos
     */
    this.socket.$sendAnswer.subscribe((data) => this.addAnswer(data));

    /**
     * hilo socket de escucha para cuando un usuario ingresa por primera vez a una sala
     */
    this.socket.$addUsuario.subscribe((data) => this.addUsuario(data));
  }

  /**
   *
   * @param data función que agrega un usuario a la sala
   */
  addUsuario(data: any) {
    console.log('..current add usuario..');
    console.log(data);
    if (Util.empty(this.room.peerServerEmisorReceptor)) {
      this.room.peerServerEmisorReceptor = {};
    }
    if (Util.empty(this.room.peerServerEmisorReceptorDesktop)) {
      this.room.peerServerEmisorReceptorDesktop = {};
    }
    // tslint:disable-next-line: forin
    for (const key in data.peerServerEmisorReceptor) {
      if (
        Util.empty(data.peerServerEmisorReceptor[key].peerServer) &&
        Util.empty(data.peerServerEmisorReceptor[key].peerClient) &&
        (data.peerServerEmisorReceptor[key].usuario1.id === this.usuario.id ||
          data.peerServerEmisorReceptor[key].usuario2.id === this.usuario.id)
      ) {
        data.peerServerEmisorReceptor[key].peerServer = new PeerServer(this.socket);
        data.peerServerEmisorReceptor[key].peerClient = new PeerClient(this.socket);
        this.room.peerServerEmisorReceptor[key] = data.peerServerEmisorReceptor[key];

        data.peerServerEmisorReceptorDesktop[key].peerServer = new PeerServer(this.socket);
        data.peerServerEmisorReceptorDesktop[key].peerClient = new PeerClient(this.socket);
        this.room.peerServerEmisorReceptorDesktop[key] = data.peerServerEmisorReceptorDesktop[key];
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
    this.socket.addListen(true);
  }

  /**
   * función crea las respuestas para el peer
   * @param data
   */
  createAnswer(data: any) {
    console.log('Create Answer');
    console.log(data);

    if (!Util.empty(data.data)) {
      if (data.camDesktop) {
        this.room.peerServerEmisorReceptorDesktop[
          data.key
        ].peerClient.addSignal(data.data);
      } else {

        this.room.peerServerEmisorReceptor[data.key].peerClient.addSignal(
          data.data
        );
      }
      this.socket.addListen(true);
      this.socket.addRoom$(this.room);
      this.socket.addListen(true);
    }
  }

  /**
   * función que agrega la respuesta a los peer
   * @param data
   */
  addAnswer(data: any) {
    console.log('Send Answer');
    if (!Util.empty(data.data)) {
      if (data.camDesktop) {
        console.log('Desktop');
        console.log(data.data);
        this.room.peerServerEmisorReceptorDesktop[
          data.key
        ].peerServer.addSignal(data.data);
      } else {
        console.log('Cam');
        console.log(data.data);
        this.room.peerServerEmisorReceptor[data.key].peerServer.addSignal(
          data.data
        );
      }
      if(data.data.type === 'answer'){
        this.room.peerServerEmisorReceptor[data.key].peerServer.gotAnswer = false;
      }
      this.socket.addListen(true);
      this.socket.addRoom$(this.room);
      this.socket.addListen(true);
    }
  }
}
