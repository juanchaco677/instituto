import { OperacionBD } from './../../modelo/operacion-bd';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class ProgramacionHorarioService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }
  // buscarElementList$(data: any) {
  //   const compoundKey = data.id.split(',');
  //   const idProfesor = +compoundKey[0];
  //   const idProgramacion = +compoundKey[1];
  //   let nuevoElement: any;
  //   this.getList$().subscribe(
  //     anyPagination => {
  //       anyPagination.array.forEach(element => {
  //         if (element.profesor.id === idProfesor
  //           && element.programacion.id === idProgramacion
  //         ) {
  //           nuevoElement = element;
  //           return nuevoElement;
  //         }
  //       });
  //     }
  //   );
  //   return nuevoElement;
  // }
}
