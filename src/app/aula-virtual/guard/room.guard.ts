import { Sesion } from '../../utils/sesion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from '../../utils/util';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RoomGuard implements CanActivate {

  constructor(
    private router: Router,
    public snackBar: MatSnackBar
  ) {

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!Util.empty(Sesion.user())) {
      console.log('sesion usuario');
      console.log(Sesion.user());
      console.log(route.data.rol);
      // tslint:disable-next-line: forin
      for (const item in route.data.rol) {

        if (route.data.rol[item] === Sesion.user().rol.tipo) {
          return true;
        }
      }
    }
    Util.openSnackBar(this.snackBar, 'No tiene los suficientes permisos para ingresar a la ruta.', 3, 'top');
    this.router.navigate(['login-room']);
    return false;
  }


  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (Util.empty(childRoute.data.rol) || childRoute.data.rol[0] === Sesion.user().rol.tipo) {
      return true;
    } else {
      Util.openSnackBar(this.snackBar, 'No tiene los suficientes permisos para ingresar a la ruta.', 3, 'top');
      return false;
    }
  }

}
