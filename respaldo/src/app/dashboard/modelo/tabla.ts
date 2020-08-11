import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { AnyPagination } from './anyPagination';

export interface Tabla {

  listPagination$: Subject<AnyPagination>;

  store(data: any, url: string): Observable<any>;

  delete(data: any, url: string): Observable<any>;

  update(data: any, url: string): Observable<any>;

  getAll(url: string, page: number, buscar: string , tipo: string): Observable<any[]> ;

  getList$(): Observable<AnyPagination>;

  buscarElementList$(data: any): any ;

  deleteElementList$(data: any);

  addElementList$(data: any);

}
