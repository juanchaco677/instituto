import { HttpClient } from '@angular/common/http';
import { OperacionBD } from './../../modelo/operacion-bd';
import { Injectable } from '@angular/core';

@Injectable()
export class EscuelaProgramaService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

  buscarElementList$(data: any) {
    const compoundKey = data.id.split(',');
    const idPrograma = +compoundKey[0];
    const idEscuela = +compoundKey[1];
    let nuevoElement: any;
    this.getList$().subscribe(
      anyPagination => {
        anyPagination.array.forEach(element => {
          if (element.programa.id === idPrograma
            && element.escuela.id === idEscuela
          ) {
            nuevoElement = element;
            return nuevoElement;
          }
        });
      }
    );
    return nuevoElement;
  }

  deleteElementList$(data: any) {
    const idEscuela: number = +data.escuela.id;
    const idPrograma: number = +data.programa.id;
    const listPagination = this.listPagination$.getValue();
    listPagination.array.forEach((element, index) => {
      if (element.escuela.id === idEscuela &&
        element.programa.id === idPrograma) {
        listPagination.array.splice(index, 1);
      }
    });
  }

}
