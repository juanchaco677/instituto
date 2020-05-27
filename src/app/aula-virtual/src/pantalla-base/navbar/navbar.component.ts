import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from './../../../../utils/util';
import { ConfiguracionService } from './../../../../dashboard/service/dashboard/configuracion.service';
import { Configuracion } from './../../../../dashboard/modelo/configuracion';
import { MenuAulaService } from './../../../service/menu-aula.service';
import { UsuarioService } from './../../../../dashboard/service/dashboard/usuario.service';
import { Router } from '@angular/router';
import { Sesion } from './../../../../utils/sesion';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Usuario } from 'src/app/dashboard/modelo/usuario';
import { Session } from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  configuraciones: Configuracion[];
  confTitulo: Configuracion = new Configuracion('titulo');
  confLogo: Configuracion = new Configuracion('logo');
  usuario: Usuario = new Usuario();
  @Output() activar = new EventEmitter<boolean>();
  @Output() sidenav = new EventEmitter();
  menuOpcion = '!Bienvenido ' + (Sesion.user().rol.tipo === 'ES' ? 'Estudiante' : 'Profesor') + ' ...¡';
  constructor(
    private configuracionService: ConfiguracionService,
    private router: Router,
    private usuarioService: UsuarioService,
    private menuService: MenuAulaService,
    private snackBar: MatSnackBar,
  ) {
    this.menuService.add$(this.menuOpcion);
    this.consultarMenuOpcion();
    this.consultarDatos();

  }

  ngOnInit() {
    this.usuarioService.getAuthUser$().subscribe(
      usuario => {
        this.usuario = usuario;
      }
    );
  }

  navegacion() {
    // this.addMenuOpcion('Perfil');
    // this.router.navigate(['administrator/dashboard/perfil-usuario', this.usuario.tipo]);
  }

  activarSidenav(){
    this.sidenav.emit();
  }

  emitir(activar) {
    this.activar.emit(activar);
    this.usuarioService.logout().subscribe(data => {
      const error: boolean = data['data'];
      if (error) {
        Sesion.delete();
        this.router.navigate(['/cerrar-sesion-es-pr']);
        this.usuarioService.logoutAuthUser$();
      }
    });
  }
  addMenuOpcion(data: string) {
    this.menuService.add$(data);
  }


  consultarDatos() {
    if (this.configuracionService.empty$()) {
      this.configuracionService.getAllConfiguration().subscribe(
        data => {
          if (data['success']) {
            this.configuraciones = data['configuraciones'];
            this.configuracionService.createConfiguracion$(this.configuraciones);
            this.configuracionService.getConfiguraciones$().subscribe(
              configuraciones => {
                configuraciones.forEach(element => {
                  if (element.key === this.confTitulo.key) {
                    this.confTitulo = element;
                  }

                  if (element.key === this.confLogo.key) {
                    this.confLogo = element;
                    this.confLogo.value = Util.getUrlLogo(this.confLogo);
                  }
                });
              }
            );
          } else {
            Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
          }

        }, error => {
          Util.openSnackBar(this.snackBar, 'Error, Consultando la configuración del nombre instituto.', 3, 'top');

        }
      );
    } else {
      this.configuracionService.getConfiguraciones$().subscribe(
        configuraciones => {
          configuraciones.forEach(element => {
            if (element.key === this.confTitulo.key) {
              this.confTitulo = element;
              return;
            }

            if (element.key === this.confLogo.key) {
              this.confLogo = element;
              this.confLogo.value = Util.getUrlLogo(this.confLogo);
              return;
            }
          });
        }
      );
    }
  }

  consultarMenuOpcion() {
    this.menuService.get$().subscribe(
      data => {
        this.menuOpcion = data;
      });
  }
}


