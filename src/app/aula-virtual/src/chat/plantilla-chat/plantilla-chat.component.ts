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
import { Component, OnInit } from '@angular/core';
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
  constructor(
    private socket: SocketIoClientService,
    private service: ListRoomService,
    private serviceProgramacion: ProgramacionHorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private overlay: OverlayContainer
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
    this.socket.$currentRoom.subscribe((data) => {
      console.log('entro a curren room');
      console.log(data);
      for (const element of data.peerServerEmisorReceptor) {
        if (Util.empty(element.peerServer) && Util.empty(element.peerClient)) {
          element.peerServer = new PeerServer();
          element.peerClient = new PeerClient();
          element.videoBoton = new VideoBoton(true, false);
          element.peerServer.createDataChannel('botones');
          element.peerClient.createDataChannel('botones');
        }
      }
      for (const element of data.peerServerEmisorReceptorDesktop) {
        if (Util.empty(element.peerServer) && Util.empty(element.peerClient)) {
          element.peerServer = new PeerServer();
          element.peerClient = new PeerClient();
          element.videoBoton = new VideoBoton(true, false);
          element.peerServer.createDataChannel('botones');
          element.peerClient.createDataChannel('botones');
        }
      }
      console.log('currentRoom');
      console.log(data);
      this.socket.addRoom$(data);
    });
  }
}
