import { MenuService } from '../../../service/menu.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/dashboard/service/dashboard/usuario.service';
import { Sesion } from 'src/app/utils/sesion';
import { Usuario } from '../../../modelo/usuario';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: Usuario = new Usuario();
  @Output() activar = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private menuService: MenuService
  ) {

  }

  ngOnInit() {
    this.usuarioService.getAuthUser$().subscribe(
      usuario => {
        this.usuario = usuario;
      }
    );
  }

  navegacion() {
    this.addMenuOpcion('Perfil');
    this.router.navigate(['administrator/dashboard/perfil-usuario',this.usuario.tipo]);
  }

  emitir(activar) {
    this.activar.emit(activar);
    this.usuarioService.logout().subscribe(data => {
      const error: boolean = data['data'];
      if (error) {
        Sesion.delete();
        this.router.navigate(['/cerrar-sesion']);
        this.usuarioService.logoutAuthUser$();
      }
    });
  }
  addMenuOpcion(data: string) {
    this.menuService.add$(data);
  }
}
