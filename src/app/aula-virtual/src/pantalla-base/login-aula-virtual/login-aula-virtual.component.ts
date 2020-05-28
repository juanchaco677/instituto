import { OverlayContainer } from '@angular/cdk/overlay';
import { PropertiesLoginChat } from '../../../../dashboard/properties/properties-login-chat';
import { Util } from '../../../../utils/util';
import { Sesion } from '../../../../utils/sesion';
import { Validacion } from '../../../../utils/validacion';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../../../dashboard/service/dashboard/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/dashboard/modelo/usuario';

@Component({
  selector: 'app-login-aula-virtual',
  templateUrl: './login-aula-virtual.component.html',
  styleUrls: ['./login-aula-virtual.component.css']
})
export class LoginAulaVirtualComponent implements OnInit {
  login;
  usuario: Usuario;
  activar = false;

  constructor(
    public properties: PropertiesLoginChat,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private overlay: OverlayContainer
  ) {

    if (!this.overlay.getContainerElement().classList.contains('theme-light')) {
      console.log('entro al theme light');
      overlay.getContainerElement().classList.add('theme-light');
      document.body.classList.add('theme-light');
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
          this.router.navigate(['aula-virtual']);
          this.login.reset();
        },
        error => {
          Util.openSnackBar(this.snackBar, 'Error, ingrese las credenciales correctas o comuníquese con el administrador.', 3, 'top');
          this.activar = false;
        }
      );
  }
}
