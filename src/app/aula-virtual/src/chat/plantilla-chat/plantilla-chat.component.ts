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
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(
    private socket: SocketIoClientService,
    private service: ListRoomService,
    private serviceProgramacion: ProgramacionHorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private overlay: OverlayContainer,
    private botones: BotonesService
  ) {
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
    const room = new Room(null, [], [], [], []);
    this.socket.$currentRoom.subscribe((data) => {
      room.id = data.id;
      room.chat = data.chat;
      room.usuarios = data.usuarios;
      for (const element of data.peerServerEmisorReceptor) {
        if (
          Util.empty(element.peerServer) &&
          Util.empty(element.peerClient) &&
          (element.usuario1.id === this.sesionUsuario.id ||
            element.usuario2.id === this.sesionUsuario.id)
        ) {
          element.peerServer = new PeerServer();
          element.peerClient = new PeerClient();
          element.videoBoton = new VideoBoton(true, false);
          element.peerServer.createDataChannel('botones');
          element.peerClient.createDataChannel('botones');
          room.peerServerEmisorReceptor.push(element);
        }
      }
      for (const element of data.peerServerEmisorReceptorDesktop) {
        if (
          Util.empty(element.peerServer) &&
          Util.empty(element.peerClient) &&
          (element.usuario1.id === this.sesionUsuario.id ||
            element.usuario2.id === this.sesionUsuario.id)
        ) {
          element.peerServer = new PeerServer();
          element.peerClient = new PeerClient();
          element.videoBoton = new VideoBoton(true, false);
          element.peerServer.createDataChannel('botones');
          element.peerClient.createDataChannel('botones');
          room.peerServerEmisorReceptorDesktop.push(element);
        }
      }
      this.socket.addRoom$(room);
      this.socket.addListen(true);
    });
    this.listenMatSidenav();
  }

  listenMatSidenav() {
    this.botones.getSidenav().subscribe((data) => {
      if (!Util.empty(data)) {
        if (data) {
          this.sidenav.toggle();
        }
      }
    });
  }
}
