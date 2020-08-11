import { OperacionBD } from './../../modelo/operacion-bd';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EscuelaUsuarioService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

  buscarElementList$(data: any) {
    const idEscuela: number = +data.escuela.id;
    const idUsuario: number = +data.usuario.id;
    const idPrograma: number = +data.programa.id;
    let nuevoElement: any;
    this.getList$().subscribe(
      anyPagination => {
        anyPagination.array.forEach(element => {
          if (element.escuela.id === idEscuela &&
              element.usuario.id === idUsuario &&
              element.programa.id === idPrograma) {
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
    const idPrograma: number = +data.programa.id;
    const listPagination = this.listPagination$.getValue();
    listPagination.array.forEach((element, index) => {
      if (element.escuela.id === idEscuela &&
        element.usuario.id === idUsuario &&
        element.programa.id === idPrograma) {
        listPagination.array.splice(index, 1);
      }
    });
  }

}
