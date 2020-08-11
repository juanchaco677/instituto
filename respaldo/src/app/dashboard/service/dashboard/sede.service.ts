import { OperacionBD } from './../../modelo/operacion-bd';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Util } from 'src/app/utils/util';
import { tap } from 'rxjs/operators';
import { Sede } from '../../modelo/sede';
@Injectable()
export class SedeService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUser(id: string): Observable<Sede> {
    return this.http.get<Sede>(Util.apiUrl + '',
      {
        headers: Util.getHttpOptionsGet(),
        params: new HttpParams({ fromString: 'id=' + id }),
        responseType: 'json'
      }).pipe(
        tap(objetos => console.log('obtener objetos')),
      );
  }
}
