import { NotificacionService } from './../../../service/notificacion.service';
import { PPT } from './../../../model/ppt';
import { BotonesService } from './../../../service/botones.service';
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
  AfterViewInit,
} from '@angular/core';
import { PeerClient } from 'src/app/aula-virtual/model/peer-client';
import { PeerServer } from 'src/app/aula-virtual/model/peer-server';
import { VideoBoton } from 'src/app/aula-virtual/model/video-boton';
import { Notificacion } from 'src/app/aula-virtual/model/notificacion';
@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css'],
})
export class ListVideoComponent implements OnInit, AfterViewInit {
  room: Room;
  usuario: Usuario;
  programacion: ProgramacionHorario;
  peerServer: PeerServer;
  contElementDesktopVisible = 0;
  redimensionar = false;
  redimensionarPPT = false;
  ppt: PPT;
  color: string;
  @Input() visible = true;
  @Input() contador = 0;
  @ViewChild('videoMultimedia') videoMultimedia: VideoMultimediaComponent;
  @ViewChild('contenedor') contenedor: ElementRef;
  @ViewChild('boton') htmlBoton: BotonesComponent;
  @ViewChild('htmlVideoDesktop') htmlVideoDesktop: DesktopMultimediaComponent;
  @ViewChildren('contentDesktop') listContentDesktop: QueryList<
    DesktopMultimediaComponent
  >;

  @ViewChildren('listVideoMultimedia') listVideoMultimedia: QueryList<
    VideoMultimediaComponent
  >;
  keysCam = [];
  keysDesktop = [];
  visibleBotones = true;
  contVisibleDesktop = 0;
  reacomodarImgIco = [
    { left: '32%', top: '26%', width: '64%', height: '50%' },
    { left: '34%', top: '29%', width: '59%', height: '50%' },
    { left: '37%', top: '30%', width: '47%', height: '45%' },
  ];
  constructor(
    public socket: SocketIoClientService,
    public botonesService: BotonesService,
    public notificacionService: NotificacionService
  ) {
    this.room = new Room(null, {}, [], {}, {}, {}, {});
    this.usuario = Sesion.userAulaChat();
  }
  ngAfterViewInit(): void {
    const cont = this.buscarDesktopMultimedia();
    this.contVisibleDesktop = cont;
    this.redimensionar = cont > 0;
  }

  ngOnInit(): void {
    this.socket
      .getProgramacion$()
      .subscribe((data) => (this.programacion = data));
    /**
     * servicio socket para escuchar cuando se agrega la sala en la pantalla
     */
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
        if (!Util.empty(this.room.peerServerEmisorReceptor)) {
          this.keysCam = Object.keys(this.room.peerServerEmisorReceptor);
        }
        if (!Util.empty(this.room.peerServerEmisorReceptorDesktop)) {
          this.keysDesktop = Object.keys(
            this.room.peerServerEmisorReceptorDesktop
          );
        }
        this.color = this.room.usuarios[this.usuario.id].color;
      }
    });
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

    /**
     * hilo socket de escucha para cuando un usuario ingresa por primera vez a una sala
     */
    this.socket.$addUsuario.subscribe((data) => this.addUsuario(data));

    this.botonesService.get().subscribe((data) => this.listenBotones(data));

    this.socket.$recivePaginationC.subscribe((data) =>
      this.recibePaignationPPT(data)
    );
  }

  /**
   * reci
   */
  recibePaignationPPT(data: any) {
    if (!Util.empty(data)) {
      this.room.ppts[data.nombre] = data;
      this.socket.addRoom$(this.room);
      this.ppt = data;
      this.redimensionarPPT = true;
      this.redimensionar = true;
    }
  }

  /**
   *
   * @param data función que agrega un usuario a la sala
   */
  addUsuario(data: any) {
    this.notificacionService.add$(new Notificacion(
      '',
      data.usuario.nombre + ' ha ingrasado al salón de clase.',
      4000,
      1,
      data.usuario
    ));
    if (Util.empty(this.room.peerServerEmisorReceptor)) {
      this.room.peerServerEmisorReceptor = {};
    }
    if (Util.empty(this.room.peerServerEmisorReceptorDesktop)) {
      this.room.peerServerEmisorReceptorDesktop = {};
    }
    if (Util.empty(this.room.ppts)) {
      this.room.ppts = {};
    }
    // tslint:disable-next-line: forin
    for (const key in data.peerServerEmisorReceptor) {
      if (
        Util.empty(data.peerServerEmisorReceptor[key].peerServer) &&
        Util.empty(data.peerServerEmisorReceptor[key].peerClient) &&
        (data.peerServerEmisorReceptor[key].usuario1.id === this.usuario.id ||
          data.peerServerEmisorReceptor[key].usuario2.id === this.usuario.id)
      ) {
        data.peerServerEmisorReceptor[key].peerServer = new PeerServer();
        data.peerServerEmisorReceptor[key].peerServer.createDataChannel(
          'informacion'
        );
        data.peerServerEmisorReceptor[key].peerClient = new PeerClient();
        data.peerServerEmisorReceptor[key].peerClient.createDataChannel(
          'informacion'
        );
        this.room.peerServerEmisorReceptor[key] =
          data.peerServerEmisorReceptor[key];

        data.peerServerEmisorReceptorDesktop[key].peerServer = new PeerServer();
        data.peerServerEmisorReceptorDesktop[key].peerServer.createDataChannel(
          'informacion'
        );
        data.peerServerEmisorReceptorDesktop[key].peerClient = new PeerClient();
        data.peerServerEmisorReceptorDesktop[key].peerClient.createDataChannel(
          'informacion'
        );

        this.room.peerServerEmisorReceptorDesktop[key] =
          data.peerServerEmisorReceptorDesktop[key];
      }
    }

    this.room.id = data.id;
    if (Util.empty(this.room.usuarios)) {
      this.room.usuarios = {};
    }
    if (Util.empty(this.room.chat)) {
      this.room.chat = [];
    }
    if (Util.empty(this.room.peerRecord) && Util.empty(this.room.peerRecord[1])) {
      this.room.peerRecord = {};
      this.room.peerRecord[1] = new PeerServerEmisorReceptor();
    }

    if (!this.buscarUsuario(data)) {
      this.room.usuarios[data.usuario.id] = data.usuario;
    }
    this.room.ppts = data.ppts;
    this.room.chat = data.chat.concat(this.room.chat);
    console.log('add room');
    console.log(this.room);
    this.socket.addRoom$(this.room);
    this.socket.addListen(true);
    // si los usuarios tiene el microfono prendiio o el video este debe vilver a generar una nueva conexion peer
    if (!Util.empty(this.videoMultimedia) && !Util.empty(this.videoMultimedia.videoBoton) &&
      (this.videoMultimedia.videoBoton.video || this.videoMultimedia.videoBoton.audio)) {
      if (!Util.empty(this.room) && !Util.empty(this.room.id) &&
        !Util.empty(this.room.peerServerEmisorReceptor) &&
        Object.keys(this.room.peerServerEmisorReceptor).length > 0) {
        let keyAux = 'P' + data.usuario.id + '' + this.usuario.id;
        if (!Util.empty(this.room.peerServerEmisorReceptor[keyAux])) {
          this.videoMultimedia.startCamDesktopReconect(true, keyAux);
        } else {
          keyAux = 'P' + this.usuario.id + '' + data.usuario.id;
          this.videoMultimedia.startCamDesktopReconect(true, keyAux);
        }
      }
    }
  }

  buscarUsuario(data: any) {
    for (const key in this.room.usuarios) {
      if (data.usuario.id === this.room.usuarios[key].id) {
        return true;
      }
    }
    return false;
  }

  /**
   * función crea las respuestas para el peer
   * @param data
   */
  async createAnswer(data: any) {

    if (!Util.empty(data.data)) {
      console.log('creante answer');
      console.log(data);
      this.socket.addListen(true);
      if (data.camDesktop) {
        if (data.data.type === 'offer') {
          await this.room.peerServerEmisorReceptorDesktop[
            data.key
          ].peerClient.createAnswer(data.data);
          this.socket.emit('sendAnswer', {
            data: this.room.peerServerEmisorReceptorDesktop[data.key].peerClient
              .localDescription,
            id: this.room.id,
            key: data.key,
            camDesktop: data.camDesktop,
            usuarioOrigen:
              this.room.peerServerEmisorReceptorDesktop[data.key].usuario1
                .id === this.usuario.id
                ? this.room.peerServerEmisorReceptorDesktop[data.key].usuario1
                : this.room.peerServerEmisorReceptorDesktop[data.key].usuario2,
            usuarioDestino:
              this.room.peerServerEmisorReceptorDesktop[data.key].usuario1
                .id === this.usuario.id
                ? this.room.peerServerEmisorReceptorDesktop[data.key].usuario2
                : this.room.peerServerEmisorReceptorDesktop[data.key].usuario1,
          });
        } else {
          if (data.data.candidate) {
            await this.room.peerServerEmisorReceptorDesktop[
              data.key
            ].peerClient.peerConnection.addIceCandidate(data.data);
          }
        }
      } else {
        if (data.data.type === 'offer') {
          await this.room.peerServerEmisorReceptor[
            data.key
          ].peerClient.createAnswer(data.data);

          this.socket.emit('sendAnswer', {
            data: this.room.peerServerEmisorReceptor[data.key].peerClient
              .localDescription,
            id: this.room.id,
            key: data.key,
            camDesktop: data.camDesktop,
            usuarioOrigen:
              this.room.peerServerEmisorReceptor[data.key].usuario1.id ===
                this.usuario.id
                ? this.room.peerServerEmisorReceptor[data.key].usuario1
                : this.room.peerServerEmisorReceptor[data.key].usuario2,
            usuarioDestino:
              this.room.peerServerEmisorReceptor[data.key].usuario1.id ===
                this.usuario.id
                ? this.room.peerServerEmisorReceptor[data.key].usuario2
                : this.room.peerServerEmisorReceptor[data.key].usuario1,
          });
        } else {
          if (data.data.candidate) {
            await this.room.peerServerEmisorReceptor[
              data.key
            ].peerClient.peerConnection.addIceCandidate(
              new RTCIceCandidate(data.data)
            );
          }
        }
      }
      this.socket.addRoom$(this.room);
      this.socket.addListen(true);
    }
  }

  /**
   * función que agrega la respuesta a los peer
   * @param data
   */
  async addAnswer(data: any) {
    if (!Util.empty(data.data) && Util.empty(data.record)) {
      this.socket.addListen(true);
      if (data.camDesktop) {
        if (data.data.type === 'answer') {
          await this.room.peerServerEmisorReceptorDesktop[
            data.key
          ].peerServer.addAnswer(data.data);
        } else {
          if (data.data.candidate) {
            this.room.peerServerEmisorReceptorDesktop[
              data.key
            ].peerServer.peerConnection.addIceCandidate(
              new RTCIceCandidate(data.data)
            );
          }
        }
      } else {
        console.log('add answer');
        console.log(data);
        if (data.data.type === 'answer') {
          await this.room.peerServerEmisorReceptor[
            data.key
          ].peerServer.addAnswer(data.data);
        } else {
          if (data.data.candidate) {
            this.room.peerServerEmisorReceptor[
              data.key
            ].peerServer.peerConnection.addIceCandidate(
              new RTCIceCandidate(data.data)
            );
          }
        }
      }
      this.socket.addRoom$(this.room);
      this.socket.addListen(true);
    } else {
      console.log('ingreso para add asnwer');
      console.log(data);
      // iniciar el record en entre el cliente profesor
      if (!Util.empty(data.record) && !Util.empty(data.data) && data.record) {
        if (data.camDesktop) {
          console.log('0');
          if (data.data.type === 'answer') {
            console.log('1');
            await this.room.peerRecord[1].peerServer.addAnswer(data.data);
          } else {
            if (data.data.candidate) {
              console.log('2');
              this.room.peerRecord[1].peerServer.peerConnection.addIceCandidate(
                new RTCIceCandidate(data.data)
              );
            }
          }
          this.socket.addRoom$(this.room);
        }
      }
    }
  }

  cambiarOrden(key: any) {
    let i = 1;
    // tslint:disable-next-line: no-shadowed-variable
    for (const key in this.room.peerServerEmisorReceptor) {
      // tslint:disable-next-line: forin
      i++;
      this.room.peerServerEmisorReceptor[key].prioridad = i;
    }
    this.room.peerServerEmisorReceptor[key].prioridad = 1;
    this.keysCam = Util.sortKeys(this.room.peerServerEmisorReceptor);
  }

  listenBotones(data: any) {
    if (!Util.empty(data)) {
      switch (data) {
        case Util.redistribuir[0]:
          break;
        case Util.redistribuir[1]:
          break;

        case Util.redistribuir[2]:
          break;
      }
    }
  }

  buscarDesktopMultimedia() {
    let cont = 0;
    for (const element of this.listContentDesktop.toArray()) {
      if (!element.visible) {
        cont++;
      }
    }
    if (!Util.empty(this.htmlVideoDesktop) && !Util.empty(this.htmlVideoDesktop.visible) && !this.htmlVideoDesktop.visible) {
      cont++;
    }
    return cont;
  }

  getClass() {
    if (this.redimensionar) {
      return 'col-md-12 col-2-redVideoM';
    } else {
      if (this.keysCam.length > 0) {
        if (this.keysCam.length > 4) {
          if (this.keysCam.length > 9) {
            return 'col-md-2 col-2-redVideoM';
          } else {
            return 'col-md-4 col-4-redVideoM';
          }
        } else {
          return 'col-md-6 col-6-redVideoM';
        }
      } else {
        return 'col-md-8 col-8-redVideoM';
      }
    }
  }

  getStyleFontSize() {
    if (this.redimensionar) {
      return 'small';
    } else {
      if (this.keysCam.length > 0) {
        if (this.keysCam.length > 4) {
          if (this.keysCam.length > 9) {
            return 'small';
          } else {
            return 'medium';
          }
        } else {
          return 'medium';
        }
      } else {
        return 'large';
      }
    }
  }

  getStyleSize() {
    if (this.redimensionar) {
      return this.reacomodarImgIco[0];
    } else {
      if (this.keysCam.length > 0) {
        if (this.keysCam.length > 4) {
          if (this.keysCam.length > 9) {
            return this.reacomodarImgIco[0];
          } else {
            return this.reacomodarImgIco[1];
          }
        } else {
          return this.reacomodarImgIco[1];
        }
      } else {
        return this.reacomodarImgIco[2];
      }
    }
  }

  getNgClassDesktop() {
    if (this.redimensionar) {
      if (this.contVisibleDesktop > 1) {
        if (this.contVisibleDesktop > 4) {
          if (this.contVisibleDesktop > 9) {
            return 'col-md-2 col-2-redVideoM';
          } else {
            return 'col-md-4 col-4-redVideoM';
          }
        } else {
          return 'col-md-4 col-4-redVideoM';
        }
      } else {
        return 'col-md-12 col-12-redVideoM';
      }
    } else {
      return 'col-md-12 col-12-redVideoM';
    }
  }
}
