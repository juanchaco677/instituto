import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Sesion } from './sesion';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Usuario } from '../dashboard/modelo/usuario';
import { Configuracion } from '../dashboard/modelo/configuracion';

export class Util {
  constructor() {}

  static video = '1';

  static audio = '2';

  static desktop = '3';

  static stopDesktop = '4';

  static mano = '5';

  static cerrar = '6';

  static redistribuir = ['1', '2', '3'];

  static apiUrl = 'http://186.87.90.15:8000/api/';

  static apiUrlNode = 'http://nodechatcami.tk';

  static apiUrlImage = 'http://186.87.90.15:8000/archivos/';

  static httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  static httpOptionsPost = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Barer ',
    }),
  };

  static getHttpOptionsPost(token: string) {
    const httpOptionsPost = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + Sesion.user().token,
      }),
    };
    return httpOptionsPost;
  }

  static getHttpOptionsGet() {
    return new HttpHeaders({
      Authorization: `Bearer ${Sesion.user().token}`,
    });
  }

  static getHttpOptionsPostProgress(token: string) {
    const httpOptionsPost = {
      reportProgress: true,
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return httpOptionsPost;
  }

  static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  static openSnackBar(
    snackBar: MatSnackBar,
    message: string,
    opcion: number,
    position: MatSnackBarVerticalPosition
  ) {
    let snackbar: string;
    switch (opcion) {
      case 1:
        snackbar = 'snackbar-success';
        break;
      case 2:
        snackbar = 'snackbar-warning';
        break;
      case 3:
        snackbar = 'snackbar-danger';
        break;
    }

    snackBar.open(message, 'x', {
      duration: 114000,
      verticalPosition: position,
      panelClass: [snackbar],
    });
  }

  static openSnackBarDuration(
    snackBar: MatSnackBar,
    message: string,
    opcion: number,
    position: MatSnackBarVerticalPosition,
    duration: number
  ) {
    let snackbar: string;
    switch (opcion) {
      case 1:
        snackbar = 'snackbar-success';
        break;
      case 2:
        snackbar = 'snackbar-warning';
        break;
      case 3:
        snackbar = 'snackbar-danger';
        break;
    }

    snackBar.open(message, '', {
      duration,
      verticalPosition: position,
      panelClass: [snackbar],
    });
  }

  static empty(data: any) {
    return (
      data === undefined ||
      data === null ||
      data === '' ||
      data === ' ' ||
      data === 0
    );
  }
  static emptyNaN(data: any) {
    return (
      data === undefined ||
      isNaN(+data) ||
      data === null ||
      data === '' ||
      data === ' ' ||
      data === 0
    );
  }

  static esMultiplo(numero: number, multiplo: number) {
    const resto = numero % multiplo;
    return resto === 0;
  }

  static getUrlImage(usuario: Usuario) {
    // console.log('viendo el usuario agregado');
    // console.log(usuario);
    if (!Util.empty(usuario)) {
      if (usuario.foto.indexOf(Util.apiUrlImage) > -1) {
        return usuario.foto;
      } else {
        if (usuario.foto.indexOf('default') > -1) {
          return Util.apiUrlImage + 'img/' + usuario.foto;
        } else {
          return (
            Util.apiUrlImage +
            usuario.tipo +
            '/' +
            usuario.cedula +
            '/' +
            usuario.foto
          );
        }
      }
    }
    return (
      Util.apiUrlImage +
      usuario.tipo +
      '/' +
      usuario.cedula +
      '/' +
      usuario.foto
    );
  }

  static getUrlLogo(configuracion: Configuracion) {
    if (!Util.empty(configuracion)) {
      if (configuracion.value.indexOf(Util.apiUrlImage) > -1) {
        return configuracion.value;
      } else {
        return Util.apiUrlImage + 'img/' + configuracion.value;
      }
    }
    return Util.apiUrlImage + 'img/default_logo.png';
  }

  static esPar(numero: number) {
    return numero % 2 === 0;
  }

  static sortObjByValue(list: any) {
    const sortedObj = {};
    Object.keys(list)
      .map((key) => [key, list[key]])
      .sort((a, b) =>
        a[1].prioridad > b[1].prioridad
          ? 1
          : a[1].prioridad < b[1].prioridad
          ? -1
          : 0
      )
      .forEach((data) => (sortedObj[data[0]] = data[1]));
    return sortedObj;
  }

  static sortKeys(lista: any) {
    return Object.keys(lista).sort((a, b) => {
      return lista[a].prioridad > lista[b].prioridad
        ? 1
        : lista[a].prioridad < lista[b].prioridad
        ? -1
        : 0;
    });
  }
}
