import { OperacionBD } from './../../modelo/operacion-bd';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProgramaService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }
}
