import { OverlayContainer } from '@angular/cdk/overlay';
import { PropertiesLoginDashboard } from '../../properties/properties-login-dashboard';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/dashboard/usuario.service';
import { Sesion } from '../../../utils/sesion';
import { MyErrorStateMatcher } from 'src/app/MyErrorStateMatcher';
import { Validacion } from 'src/app/utils/validacion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
import { Usuario } from '../../modelo/usuario';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login;
  usuario: Usuario;
  activar = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    public properties: PropertiesLoginDashboard,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private overlay: OverlayContainer
  ) {
    if (!this.overlay.getContainerElement().classList.contains('theme-dark')) {
      overlay.getContainerElement().classList.add('theme-dark');
      document.body.classList.add('theme-dark');
    }
    this.usuario = new Usuario('', '');
    this.login = this.formBuilder.group({
      email: Validacion.getCampoEmail(true),
      password: Validacion.getPassword(true, 2, 3),
      tipo: Validacion.getCampoLetras(true)
    });
  }

  ngOnInit() {

  }
  getControls(key: string) {

    return this.login.controls[key];
  }
  onSubmit() {

    if (this.login.invalid) {
      return;
    }
    this.activar = true;
    this.usuarioService
      .login({ email: this.usuario.email, password: this.usuario.password, tipo: this.usuario.tipo })
      .subscribe(
        data => {
          const usuario = data['usuario'];
          usuario.foto = Util.getUrlImage(usuario);
          Sesion.setUser(usuario);
          this.usuarioService.addAuthUser$(usuario);
          this.activar = false;
          this.router.navigate(['/administrator']);
          this.login.reset();
        },
        error => {
          Util.openSnackBar(this.snackBar, 'Error, ingrese las credenciales correctas o comuníquese con el administrador.', 3, 'top');
          this.activar = false;
        }
      );
  }
}
