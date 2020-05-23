import { ProgramacionHorarioService } from '../../../../dashboard/service/dashboard/programacion-horario.service';
import { Sesion } from 'src/app/utils/sesion';
import { ListRoomService } from '../../../service/list-room.service';
import { Util } from '../../../../utils/util';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Session } from 'protractor';
import { IncripcionAsigEs } from 'src/app/dashboard/modelo/incripcion-asig-es';
import { ProgramacionHorario } from 'src/app/dashboard/modelo/programacion-horario';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  incripcionAsigEs: IncripcionAsigEs;
  progracionHorario: ProgramacionHorario;
  data: any;
  constructor(
    private service: ListRoomService,
    private serviceProgramacion: ProgramacionHorarioService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.paramMap.subscribe(params => {
      const compoundKey = params.get('compoundKey');
      if (!Util.empty(compoundKey)) {
        if (Sesion.user().tipo === 'ES') {
          this.incripcionAsigEs = this.service.buscarElementList$({ id: compoundKey });
          if (Util.empty(this.incripcionAsigEs)) {
            this.router.navigate(['../list-room']);
          }
        } else {
          if (Sesion.user().tipo === 'PR') {
            const idProgramacion = +compoundKey.split(',')[1];
            this.progracionHorario = this.serviceProgramacion.buscarElementList$({ id: idProgramacion });
          } else {
            this.router.navigate(['../login-room']);
          }
        }
      } else {
        this.router.navigate(['../list-room']);
      }
    });
  }
  ngOnInit(): void {
  }
}
