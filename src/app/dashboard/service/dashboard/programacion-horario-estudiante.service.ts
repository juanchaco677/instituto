import { HttpClient } from '@angular/common/http';
import { OperacionBD } from './../../modelo/operacion-bd';
import { Injectable } from '@angular/core';

@Injectable()
export class ProgramacionHorarioEstudianteService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }
}
