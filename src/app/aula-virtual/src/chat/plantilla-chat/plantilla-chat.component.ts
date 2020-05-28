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

@Component({
  selector: 'app-plantilla-chat',
  templateUrl: './plantilla-chat.component.html',
  styleUrls: ['./plantilla-chat.component.css']
})
export class PlantillaChatComponent implements OnInit {

  incripcionAsigEs: IncripcionAsigEs;
  programacionHorario: ProgramacionHorario;
  data: any;
  room: Room;
  constructor(
    private socket: SocketIoClientService,
    private service: ListRoomService,
    private serviceProgramacion: ProgramacionHorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private overlay: OverlayContainer,
  ) {
    this.room = new Room();
    if (!this.overlay.getContainerElement().classList.contains('theme-light')) {
      overlay.getContainerElement().classList.add('theme-light');
      document.body.classList.add('theme-light');
    }

    this.route.paramMap.subscribe(params => {
      const compoundKey = params.get('compoundKey');
      if (!Util.empty(compoundKey)) {
        if (Sesion.user().tipo === 'ES') {
          if (Util.empty(this.service.listPagination$)) {
            this.service.get('incripcion-horario-estudiante/get',
              compoundKey.split(',')[0] + ',' + compoundKey.split(',')[1]).subscribe(
                res => {
                  this.incripcionAsigEs = res['data'];
                  this.socket.emit('livingRoom', { programacion: this.incripcionAsigEs.programacion, usuario: Sesion.user() });
                }
              );
          } else {
            this.incripcionAsigEs = this.service.buscarElementList$({ id: compoundKey });
            if (Util.empty(this.incripcionAsigEs)) {
              this.router.navigate(['../../../aula-virtual']);
            } else {
              this.socket.emit('livingRoom', { programacion: this.incripcionAsigEs.programacion, usuario: Sesion.user() });
            }
          }
        } else {
          if (Sesion.user().tipo === 'PR') {
            const idProgramacion = +compoundKey.split(',')[1];
            if (Util.empty(this.serviceProgramacion.listPagination$)) {
              this.serviceProgramacion.get('programacion-horario/get', idProgramacion).subscribe(
                res => {
                  this.programacionHorario = res['data'];
                  this.socket.emit('livingRoom', { programacion: this.programacionHorario, usuario: Sesion.user() });
                }
              );
            } else {
              this.programacionHorario = this.serviceProgramacion.buscarElementList$({ id: idProgramacion });

              if (Util.empty(this.programacionHorario)) {
                this.router.navigate(['../../../aula-virtual']);
              } else {
                this.socket.emit('livingRoom', { programacion: this.programacionHorario, usuario: Sesion.user() });
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
    this.socket.$currentRoom.subscribe(
      res => {
        this.room = res;
        for (const item in this.room.usuarios) {
          if (this.room.usuarios[item].id === Sesion.user().id) {
            this.room.usuarios.splice( +item , 1);
          }
        }
        this.socket.addRoom$(this.room);
      }
    );
  }


}


