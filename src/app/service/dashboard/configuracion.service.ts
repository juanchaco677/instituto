import { OperacionBD } from './../../modelo/operacion-bd';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Sede } from 'src/app/modelo/sede';
import {
  HttpClient, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { Util } from 'src/app/utils/util';
import { Sesion } from 'src/app/utils/sesion';
import { tap } from 'rxjs/operators';
import { Configuracion } from 'src/app/modelo/configuracion';
@Injectable()
export class ConfiguracionService extends OperacionBD {
  configuraciones$ = new BehaviorSubject<Configuracion[]>(null);


  constructor(public http: HttpClient) {
    super(http);
  }

  storeLogo(data: any): Observable<any> {
    const req = new HttpRequest('POST', Util.apiUrl + 'configuracion/store', data, {
      reportProgress: true,
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + Sesion.user().token
      })
    });
    return this.http.request(req);
  }

  getAllConfiguration(): Observable<Configuracion[]> {
    return this.http.get<Configuracion[]>(Util.apiUrl + 'configuracion/get-all-configuration',
      {
        headers: Util.getHttpOptionsGet(),
        responseType: 'json'
      }).pipe(
        tap(configuracion => console.log('obtener configuracion')),
      );
  }

  createConfiguracion$(configuraciones: Configuracion[]) {
    // configuraciones.concat(this.configuraciones$.getValue());
    // const currentValue = this.configuraciones$.getValue();
    // const updatedValue = [...currentValue, configuraciones];
    this.configuraciones$.next(configuraciones);
  }

  addConfiguracion$(configuracion: Configuracion) {
    const array: Configuracion[] = [configuracion].concat(this.configuraciones$.getValue());
    this.createConfiguracion$(array);
  }

  deleteConfiguracion$(configuracion: Configuracion) {

    const $configuracion = this.configuraciones$.getValue();
    $configuracion.forEach((element, index) => {
      if (element.key === configuracion.key) {
        $configuracion.splice(index, 1);
      }
    });
  }
  /**
   * devolver el observable usuario para que cualquier componente lo utilice
   */
  getConfiguraciones$(): Observable<Configuracion[]> {
    return this.configuraciones$.asObservable();
  }

  buscarConfiguracion$(configuracion: Configuracion): Configuracion {
    let nuevoConfiguracion = new Configuracion();
    const usuariosPagination = this.configuraciones$.getValue();
    usuariosPagination.forEach(element => {
      if (element.key === configuracion.key) {
        nuevoConfiguracion = element;
        return nuevoConfiguracion;
      }
    });
    return nuevoConfiguracion;
  }

  empty$(): boolean {
    if (!Util.empty(this.configuraciones$)
      && !Util.empty(this.configuraciones$.getValue())
      && this.configuraciones$.getValue().length > 0) {
      return false;
    }
    return true;
  }

}
