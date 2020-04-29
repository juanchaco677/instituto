import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperacionBD } from 'src/app/modelo/operacion-bd';

@Injectable()
export class LineaMateriaService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

  buscarElementList$(data: any) {
    const idMaterigaOrigen: number = +data.escuela.id;
    const idMateriga: number = +data.usuario.id;
    let nuevoElement: any;
    this.getList$().subscribe(
      anyPagination => {
        anyPagination.array.forEach(element => {
          if (element.escuela.id === idMaterigaOrigen &&
              element.usuario.id === idMateriga) {
            nuevoElement = element;
            return nuevoElement;
          }
        });
      }
    );
    return nuevoElement;
  }

  deleteElementList$(data: any) {
    const idMaterigaOrigen: number = +data.escuela.id;
    const idMateriga: number = +data.usuario.id;
    const listPagination = this.listPagination$.getValue();
    listPagination.array.forEach((element, index) => {
      if (element.escuela.id === idMaterigaOrigen &&
        element.usuario.id === idMateriga) {
        listPagination.array.splice(index, 1);
      }
    });
  }

}
