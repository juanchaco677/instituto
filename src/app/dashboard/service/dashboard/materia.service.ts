import { OperacionBD } from './../../modelo/operacion-bd';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MateriaService  extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }
}
