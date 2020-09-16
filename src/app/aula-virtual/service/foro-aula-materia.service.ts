import { OperacionBD } from './../../dashboard/modelo/operacion-bd';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ForoAulaMateriaService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }
}
