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

@Component({
  selector: 'app-plantilla-chat',
  templateUrl: './plantilla-chat.component.html',
  styleUrls: ['./plantilla-chat.component.css'],
})
export class PlantillaChatComponent implements OnInit {
  incripcionAsigEs: IncripcionAsigEs;
  programacionHorario: ProgramacionHorario;
  data: any;
  room: Room;
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
    console.log('innovar ' + this.sesionUsuario.rol.tipo);
    this.room = new Room();
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
      for (const element of data.peerServerEmisorReceptor) {
        console.log('ver para creeer');
        console.log(element.peerServer);
        console.log(element.peerClient);
        console.log(element);
        console.log(this.usuario);
        if (
          element.emisor.id === this.usuario.id &&
          Util.empty(element.peerServer)
        ) {
          console.log('crear servidor');
          element.peerServer = new PeerServer();
          element.peerClient = new PeerClient();
        } else {
          if (
            element.receptor.id === this.usuario.id &&
            Util.empty(element.peerClient)
          ) {
            console.log('crear cliente');
            element.peerClient = new PeerClient();
            element.peerServer = new PeerServer();
          }
        }
      }
      this.socket.addRoom$(data);
      // this.socket.getRoom$().subscribe((room) => {
      //   for (const element of room.peerServerEmisorReceptor) {
      //     console.log(element);
      //   }
      // });
    });

    // this.socket.$addUsuario.subscribe((data) => {
    //   if (
    //     !Util.empty(this.room) &&
    //     !Util.empty(this.room.usuarios) &&
    //     this.room.usuarios.length > 0
    //   ) {
    //     for (const usuario of this.room.usuarios) {
    //       if (usuario.id === data.id) {
    //         this.socket.deleteRoomElementUsuario$(usuario);
    //         this.socket.addUsuario$(data);
    //       }
    //     }
    //   } else {
    //     if (!Util.empty(this.room)) {
    //       this.socket.addUsuario$(data);
    //     }
    //   }
    // });
  }
}
