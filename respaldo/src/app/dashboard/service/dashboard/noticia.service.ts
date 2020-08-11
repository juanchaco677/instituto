import { Sesion } from '../../../utils/sesion';
import { Util } from '../../../utils/util';
import { Observable } from 'rxjs';
import { OperacionBD } from './../../modelo/operacion-bd';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NoticiaService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

  store(data: any): Observable<any> {
    const req = new HttpRequest('POST', Util.apiUrl + 'noticia/store', data, {
      reportProgress: true,
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + Sesion.user().token
      })
    });
    return this.http.request(req);
  }

}
