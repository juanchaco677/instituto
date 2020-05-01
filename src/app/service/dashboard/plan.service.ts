import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperacionBD } from 'src/app/modelo/operacion-bd';

@Injectable()
export class PlanService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }
}
