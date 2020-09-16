import { Tabla } from './tabla';
import { AnyPagination } from './anyPagination';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Util } from 'src/app/utils/util';
import { Sesion } from 'src/app/utils/sesion';
import { AnySort } from 'src/app/sort/anySort';

export class OperacionBD implements Tabla {
  listPagination$: BehaviorSubject<AnyPagination>;

  constructor(public http: HttpClient) {}

  store(data: any, url: string): Observable<any> {
    return this.http
      .post<any>(
        Util.apiUrl + url,
        data,
        Util.getHttpOptionsPost(Sesion.user().token)
      )
      .pipe(tap((token) => console.log('crear objeto')));
  }

  delete(data: any, url: string): Observable<any> {
    return this.http
      .post<any>(
        Util.apiUrl + url,
        data,
        Util.getHttpOptionsPost(Sesion.user().token)
      )
      .pipe(tap((token) => console.log('eliminar objetos')));
  }

  update(data: any, url: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getAll(
    url: string,
    page: number,
    buscar: string,
    tipo: string
  ): Observable<any[]> {
    const params = new HttpParams({
      fromString:
        page > 0
          ? 'page=' + page + '&buscar=' + buscar + '&tipo=' + tipo
          : '&buscar=' + buscar + '&tipo=' + tipo,
    });
    return this.http
      .get<any[]>(Util.apiUrl + url, {
        headers: Util.getHttpOptionsGet(),
        params,
        responseType: 'json',
      })
      .pipe(tap((objetos) => console.log('obtener objetos')));
  }

  getAllGeneric(url: string, page: number, data: any): Observable<any[]> {
    const params = new HttpParams({
      fromString: 'page=' + page + '&data=' + data,
    });
    return this.http
      .get<any[]>(Util.apiUrl + url, {
        headers: Util.getHttpOptionsGet(),
        params,
        responseType: 'json',
      })
      .pipe(tap((objetos) => console.log('obtener objetos')));
  }

  get(url: string, data: any): Observable<any> {
    const params = new HttpParams({ fromString: 'id=' + data });
    return this.http
      .get<any>(Util.apiUrl + url, {
        headers: Util.getHttpOptionsGet(),
        params,
        responseType: 'json',
      })
      .pipe(tap((objetos) => console.log('obtener objetos')));
  }

  getAllObject(
    url: string,
    page: number,
    buscar: string,
    data: any
  ): Observable<any[]> {
    const params = new HttpParams({
      fromString:
        page > 0
          ? 'page=' + page + '&buscar=' + buscar + '&data=' + data
          : '&buscar=' + buscar + '&data=' + data,
    });
    return this.http
      .get<any[]>(Util.apiUrl + url, {
        headers: Util.getHttpOptionsGet(),
        params,
        responseType: 'json',
      })
      .pipe(tap((objetos) => console.log('obtener objetos')));
  }

  getList(url: string, params: HttpParams): Observable<any[]> {
    return this.http
      .get<any[]>(Util.apiUrl + url, {
        headers: Util.getHttpOptionsGet(),
        params,
        responseType: 'json',
      })
      .pipe(tap((objetos) => console.log('obtener objetos')));
  }

  getList$(){
    return this.listPagination$.asObservable();
  }
  createList$(anyPagination: AnyPagination) {
    this.listPagination$ = new BehaviorSubject<AnyPagination>(anyPagination);
  }
  buscarElementList$(data: any) {
    const id: number = +data.id;
    let nuevoElement: any;
    this.getList$().subscribe((anyPagination) => {
      anyPagination.array.forEach((element) => {
        if (element.id === id) {
          nuevoElement = element;
          return nuevoElement;
        }
      });
    });
    return nuevoElement;
  }

  deleteElementList$(data: any) {
    const id: number = +data.id;
    const listPagination = this.listPagination$.getValue();
    listPagination.array.forEach((element, index) => {
      if (element.id === id) {
        listPagination.array.splice(index, 1);
      }
    });
  }

  addElementList$(data: any) {
    if (this.size$() < 5) {
      console.log('si es menor a 5 ');
      console.log(data);
      const anyPagination = new AnyPagination(this.listPagination$.getValue().array, this.listPagination$.getValue().pagination);
      anyPagination.array = anyPagination.array.concat([data]);
      this.listPagination$.next(anyPagination);
      console.log(anyPagination);
    }
  }

  size$(): number {
    const listPagination = this.listPagination$.getValue();
    return listPagination.array.length;
  }
}
