import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperacionBD } from 'src/app/modelo/operacion-bd';

@Injectable()
export class EscuelaUsuarioService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

  buscarElementList$(data: any) {
    const idEscuela: number = +data.escuela.id;
    const idUsuario: number = +data.usuario.id;
    let nuevoElement: any;
    this.getList$().subscribe(
      anyPagination => {
        anyPagination.array.forEach(element => {
          if (element.escuela.id === idEscuela &&
              element.usuario.id === idUsuario) {
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
    const idUsuario: number = +data.usuario.id;
    const listPagination = this.listPagination$.getValue();
    listPagination.array.forEach((element, index) => {
      if (element.escuela.id === idEscuela &&
        element.usuario.id === idUsuario) {
        listPagination.array.splice(index, 1);
      }
    });
  }

}
