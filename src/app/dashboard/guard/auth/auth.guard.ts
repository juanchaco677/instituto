import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Util } from 'src/app/utils/util';
import { Sesion } from 'src/app/utils/sesion';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    public snackBar: MatSnackBar
  ) {

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!Util.empty(Sesion.user())) {
      if (route.data.rol[0] === Sesion.user().rol.tipo) {
        return true;
      } else {
        Util.openSnackBar(this.snackBar, 'No tiene los suficientes permisos para ingresar a la ruta.', 3, 'top');
      }
    }
    this.router.navigate(['']);
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
