import { OperacionBD } from './../../dashboard/modelo/operacion-bd';
import { tap } from 'rxjs/operators';
import { Util } from './../../utils/util';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ArchivoBilbliotecaService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

  store(data: any, url: string): Observable<any> {
    const httpOptionsPost = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http
      .post<any>(Util.apiUrl + url + '/store', data, httpOptionsPost)
      .pipe(tap((success) => console.log('crear objeto')));
  }

  getAll(url: string, data: any): Observable<any[]> {
    const params = new HttpParams({
      fromString:
        'extension=' +
        data.extension +
        '&tipo=' +
        data.tipo +
        '&id_salon=' +
        data.id_salon +
        '&id_programacion=' +
        data.id_programacion,
    });
    return this.http
      .get<any[]>(Util.apiUrl + url, {
        headers: Util.getHttpOptionsGet(),
        params,
        responseType: 'json',
      })
      .pipe(tap((objetos) => console.log('obtener objetos')));
  }

  getAllObject(url: string, page: number, data: any): Observable<any[]> {
    const params = new HttpParams({
      fromString:
        'page=' +
        page +
        '&extension=' +
        data.extension +
        '&tipo=' +
        data.tipo +
        '&id_salon=' +
        data.id_salon
    });
    return this.http
      .get<any[]>(Util.apiUrl + url, {
        headers: Util.getHttpOptionsGet(),
        params,
        responseType: 'json',
      })
      .pipe(tap((objetos) => console.log('obtener objetos')));
  }
}
