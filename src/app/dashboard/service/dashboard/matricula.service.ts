import { HttpClient } from '@angular/common/http';
import { OperacionBD } from './../../modelo/operacion-bd';
import { Injectable } from '@angular/core';

@Injectable()
export class MatriculaService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }
}
