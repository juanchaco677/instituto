import { OperacionBD } from 'src/app/modelo/operacion-bd';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PlanEstudioService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

  buscarElementList$(data: any) {
    const compoundKey = data.id.split(',');
    const idPrograma = +compoundKey[0];
    const idMateria = +compoundKey[1];
    const idPlan = +compoundKey[2];
    let nuevoElement: any;
    this.getList$().subscribe(
      anyPagination => {
        anyPagination.array.forEach(element => {
          if (element.programa.id === idPrograma
            && element.materia.id === idMateria
            && element.plan.id === idPlan
          ) {
            nuevoElement = element;
            return nuevoElement;
          }
        });
      }
    );
    return nuevoElement;
  }
}
