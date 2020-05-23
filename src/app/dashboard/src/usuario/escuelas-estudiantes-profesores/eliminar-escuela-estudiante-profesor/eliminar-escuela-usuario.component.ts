import { MenuService } from '../../../../service/menu.service';
import { PropertiesEscuelaUsuarios } from '../../../../properties/properties-escuela-usuarios';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EscuelaUsuarioService } from 'src/app/dashboard/service/dashboard/escuela-usuario.service';
import { ActivatedRoute } from '@angular/router';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
@Component({
  selector: 'app-eliminar-escuela-usuario',
  templateUrl: './eliminar-escuela-usuario.component.html',
  styleUrls: ['./eliminar-escuela-usuario.component.css']
})
export class EliminarEscuelaUsuarioComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuelaUsuarios,
    public snackBar: MatSnackBar,
    public service: EscuelaUsuarioService,
    private menuService: MenuService,
    public route: ActivatedRoute,
  ) {
    super(snackBar, service , properties.get('route-escuela-usuario').value, route );
    this.displayedColumns = properties.get('table-eliminar-escuela-usuario-col').value;
    this.menuService.add$(properties.get('menu-escuela-usuario').value);
  }

  ngOnInit() {

  }
}
