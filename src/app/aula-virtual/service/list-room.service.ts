import { OperacionBD } from './../../dashboard/modelo/operacion-bd';
import { Util } from '../../utils/util';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ListRoomService extends OperacionBD {

  constructor(public http: HttpClient) {
    super(http);
  }

   getAll(url: string, page: number, buscar: string, tipo: string): Observable<any[]> {
    const params = new HttpParams({ fromString: page > 0 ? 'page=' + page + '&buscar=' + buscar + '&tipo=' + tipo : '&buscar=' + buscar + '&tipo=' + tipo });
    return this.http.get<any[]>(Util.apiUrl + url, { headers: Util.getHttpOptionsGet(), params: params, responseType: 'json' }).pipe(
      tap(objetos => console.log('obtener objetos')),
    );
  }

}


