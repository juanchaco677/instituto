import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Util } from '../../utils/util';
import { Sesion } from '../../utils/sesion';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Usuario } from '../../modelo/usuario';
import { OperacionBD } from 'src/app/modelo/operacion-bd';
@Injectable()
export class UsuarioService extends OperacionBD {

  usuario$ = new BehaviorSubject<Usuario>(new Usuario());
  constructor(public http: HttpClient) {
    super(http);
  }

  store(data: any): Observable<any> {
    const req = new HttpRequest('POST', Util.apiUrl + 'auth/store', data, {
      reportProgress: true,
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + Sesion.user().token
      })
    });
    return this.http.request(req);
  }


  login(data): Observable<any> {
    return this.http
      .post<any>(Util.apiUrl + 'auth/login', data, Util.httpOptions)
      .pipe(
        tap(token => console.log('login usuario')),
      );
  }

  logout(): Observable<any> {

    this.logoutAuthUser$();
    return this.http
      .post<any>(
        Util.apiUrl + 'auth/logout',
        { token: Sesion.user().token },
        Util.getHttpOptionsPost(Sesion.user().token)
      )
      .pipe(
        tap(token => console.log('cerrar sesion usuario'))
      );
  }
  addAuthUser$(usuario: Usuario) {
    this.usuario$.next(usuario);
  }

  /**
   * eliminar el observable del usuario logueado
   */
  logoutAuthUser$() {
    this.usuario$.next(new Usuario());
  }
  /**
   * devolver el observable usuario para que cualquier componente lo utilice
   */
  getAuthUser$(): Observable<Usuario> {
    if (Sesion.user() != null) {
      if (Util.empty(this.usuario$.getValue().id)) {
        this.addAuthUser$(Sesion.user());
      }
    }
    return this.usuario$.asObservable();
  }
}
