import { ThemeService } from './../../../../theme.service';
import { PeerServerEmisorReceptor } from './../../../model/peer-server-emisor-receptor';
import { BotonesService } from './../../../service/botones.service';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { PeerClient } from 'src/app/aula-virtual/model/peer-client';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ListRoomService } from './../../../service/list-room.service';
import { ProgramacionHorarioService } from '../../../../dashboard/service/dashboard/programacion-horario.service';
import { Sesion } from 'src/app/utils/sesion';
import { Util } from '../../../../utils/util';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IncripcionAsigEs } from 'src/app/dashboard/modelo/incripcion-asig-es';
import { ProgramacionHorario } from 'src/app/dashboard/modelo/programacion-horario';
import { PeerServer } from 'src/app/aula-virtual/model/peer-server';
import { VideoBoton } from 'src/app/aula-virtual/model/video-boton';

@Component({
  selector: 'app-plantilla-chat',
  templateUrl: './plantilla-chat.component.html',
  styleUrls: ['./plantilla-chat.component.css'],
})
export class PlantillaChatComponent implements OnInit {
  incripcionAsigEs: IncripcionAsigEs;
  programacionHorario: ProgramacionHorario;
  data: any;
  usuario: Usuario;
  sesionUsuario: any;
  room = new Room(null, {}, [], {}, {}, {});
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    public themeService: ThemeService,
    public socket: SocketIoClientService,
    private service: ListRoomService,
    private serviceProgramacion: ProgramacionHorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private overlay: OverlayContainer,
    private botones: BotonesService
  ) {
    // if (this.overlay.getContainerElement().classList.contains('theme-dark')) {
    themeService.add$(3);
    // }
    this.sesionUsuario = Sesion.user();

    if (!this.overlay.getContainerElement().classList.contains('theme-light')) {
      overlay.getContainerElement().classList.add('theme-light');
      document.body.classList.add('theme-light');
    }
    this.usuario = new Usuario();
    this.usuario = Sesion.userAulaChat();

    this.route.paramMap.subscribe((params) => {
      const compoundKey = params.get('compoundKey');
      if (!Util.empty(compoundKey)) {
        if (Sesion.user().tipo === 'ES') {
          if (Util.empty(this.service.listPagination$)) {
            this.service
              .get(
                'incripcion-horario-estudiante/get',
                compoundKey.split(',')[0] + ',' + compoundKey.split(',')[1]
              )
              .subscribe((res) => {
                this.incripcionAsigEs = res['data'];
                this.socket.emit('livingRoom', {
                  programacion: this.incripcionAsigEs.programacion,
                  usuario: this.usuario,
                });
              });
          } else {
            this.incripcionAsigEs = this.service.buscarElementList$({
              id: compoundKey,
            });
            if (Util.empty(this.incripcionAsigEs)) {
              this.router.navigate(['../../../aula-virtual']);
            } else {
              this.socket.emit('livingRoom', {
                programacion: this.incripcionAsigEs.programacion,
                usuario: this.usuario,
              });
            }
          }
        } else {
          if (Sesion.user().tipo === 'PR') {
            const idProgramacion = +compoundKey.split(',')[1];
            if (Util.empty(this.serviceProgramacion.listPagination$)) {
              this.serviceProgramacion
                .get('programacion-horario/get', idProgramacion)
                .subscribe((res) => {
                  this.programacionHorario = res['data'];
                  this.socket.emit('livingRoom', {
                    programacion: this.programacionHorario,
                    usuario: this.usuario,
                  });
                });
            } else {
              this.programacionHorario = this.serviceProgramacion.buscarElementList$(
                { id: idProgramacion }
              );

              if (Util.empty(this.programacionHorario)) {
                this.router.navigate(['../../../aula-virtual']);
              } else {
                this.socket.emit('livingRoom', {
                  programacion: this.programacionHorario,
                  usuario: this.usuario,
                });
              }
            }
          } else {
            this.router.navigate(['../../../aula-virtual']);
          }
        }
      } else {
        this.router.navigate(['../../../aula-virtual']);
      }
    });
  }
  ngOnInit(): void {
    this.socket.$currentRoom.subscribe((data) => this.currentRoom(data));
    this.listenMatSidenav();
  }

  async currentRoom(data: any) {
    console.log('current room');
    console.log(data);
    for (const key in data.peerServerEmisorReceptor) {
      if (
        data.peerServerEmisorReceptor[key].usuario1.id ===
          this.sesionUsuario.id ||
        data.peerServerEmisorReceptor[key].usuario2.id === this.sesionUsuario.id
      ) {
        this.room.peerServerEmisorReceptor[key] =
          data.peerServerEmisorReceptor[key];
        this.room.peerServerEmisorReceptorDesktop[key] =
          data.peerServerEmisorReceptorDesktop[key];
      }
    }
    this.room.id = data.id;
    this.room.usuarios = data.usuarios;
    this.room.chat = data.chat;
    this.room.ppts = data.ppts;
    this.startCamDesktop(false);
    this.startCamDesktop(true);
    this.socket.addRoom$(this.room);
    this.socket.addListen(true);
  }

  /**
   * función que crea las offer de los peer antes de ser enviada para los demas clientes
   * @param addtrack
   */
  startCamDesktop(camDesktop: boolean) {
    if (
      !Util.empty(this.room) &&
      !Util.empty(this.room.usuarios) &&
      Object.keys(this.room.usuarios).length > 0
    ) {
      const elements = camDesktop
        ? this.room.peerServerEmisorReceptorDesktop
        : this.room.peerServerEmisorReceptor;
      for (const key in elements) {
        if (
          elements[key].usuario1.id === this.usuario.id ||
          elements[key].usuario2.id === this.usuario.id
        ) {
          elements[key].peerServer = new PeerServer();
          elements[key].peerClient = new PeerClient();
          elements[key].peerClient.createDataChannel('informacion');
          elements[key].peerServer.createDataChannel('informacion');
        }
      }
    }
  }

  listenMatSidenav() {
    this.botones.getSidenav().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(this.sidenav)) {
        if (data) {
          this.sidenav.toggle();
        }
      }
    });
  }
}
