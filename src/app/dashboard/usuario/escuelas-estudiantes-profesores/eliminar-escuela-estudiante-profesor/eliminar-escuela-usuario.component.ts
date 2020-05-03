import { EliminarBaseComponent } from './../../../../modelo/eliminar-base-component';
import { MenuService } from './../../../../service/menu.service';
import { PropertiesEscuelaUsuarios } from './../../../../properties/properties-escuela-usuarios';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EscuelaUsuario } from 'src/app/modelo/escuela-usuario';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EscuelaUsuarioService } from 'src/app/service/dashboard/escuela-usuario.service';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Usuario } from 'src/app/modelo/usuario';
import { Escuela } from 'src/app/modelo/escuela';
import { ActivatedRoute } from '@angular/router';
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
