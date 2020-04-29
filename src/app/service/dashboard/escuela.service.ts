import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperacionBD } from 'src/app/modelo/operacion-bd';
@Injectable()
export class EscuelaService  extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }
}
