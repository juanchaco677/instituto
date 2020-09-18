import { ForoAulaComentario } from './../model/foro-aula-comentario';
import { BehaviorSubject } from 'rxjs';
import { OperacionBD } from './../../dashboard/modelo/operacion-bd';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ForoComentarioService extends OperacionBD {
  // list$: BehaviorSubject<ForoAulaComentario[]>;
  constructor(public http: HttpClient) {

    super(http);
    // this.list$ = new BehaviorSubject<ForoAulaComentario[]>([]);
  }




}
