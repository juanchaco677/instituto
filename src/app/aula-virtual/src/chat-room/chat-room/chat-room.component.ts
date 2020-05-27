import { OverlayContainer } from '@angular/cdk/overlay';
import { ListRoomService } from './../../../service/list-room.service';

import { DisplayMediaComponent } from './../display-media/display-media.component';
import { ProgramacionHorarioService } from '../../../../dashboard/service/dashboard/programacion-horario.service';
import { Sesion } from 'src/app/utils/sesion';
import { Util } from '../../../../utils/util';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Session } from 'protractor';
import { IncripcionAsigEs } from 'src/app/dashboard/modelo/incripcion-asig-es';
import { ProgramacionHorario } from 'src/app/dashboard/modelo/programacion-horario';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent  implements OnInit {

  incripcionAsigEs: IncripcionAsigEs;
  progracionHorario: ProgramacionHorario;
  data: any;

  constructor(
    private service: ListRoomService,
    private serviceProgramacion: ProgramacionHorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private overlay: OverlayContainer,
  ) {

    if (!this.overlay.getContainerElement().classList.contains('theme-light')) {
      overlay.getContainerElement().classList.add('theme-light');
      document.body.classList.add('theme-light');
    }

    this.route.paramMap.subscribe(params => {
      const compoundKey = params.get('compoundKey');
      if (!Util.empty(compoundKey)) {
        if (Sesion.user().tipo === 'ES') {
          if (Util.empty(this.service.listPagination$)){
            this.service.get('incripcion-horario-estudiante/get' ,
             compoundKey.split(',')[0] + ',' + compoundKey.split(',')[1] ).subscribe(
              res => this.incripcionAsigEs = res['data']
            );
          }else{
          this.incripcionAsigEs = this.service.buscarElementList$({ id: compoundKey });
          if (Util.empty(this.incripcionAsigEs)) {
            this.router.navigate(['../../../aula-virtual']);
          }
        }
        } else {
          if (Sesion.user().tipo === 'PR') {
            const idProgramacion = +compoundKey.split(',')[1];
            if (Util.empty(this.serviceProgramacion.listPagination$)){
              this.serviceProgramacion.get('programacion-horario/get' , idProgramacion).subscribe(
                res => this.progracionHorario = res['data']
              );
            }else{
              this.progracionHorario = this.serviceProgramacion.buscarElementList$({ id: idProgramacion });
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
  }


}
