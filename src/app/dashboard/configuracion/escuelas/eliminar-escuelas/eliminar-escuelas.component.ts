import { MenuService } from './../../../../service/menu.service';
import { PropertiesEscuela } from './../../../../properties/properties-escuelas';
import { EliminarBaseComponent } from './../../../../modelo/eliminar-base-component';
import { Component, OnInit } from '@angular/core';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { Escuela } from 'src/app/modelo/escuela';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EscuelaService } from 'src/app/service/dashboard/escuela.service';
import { Util } from 'src/app/utils/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Sede } from 'src/app/modelo/sede';
@Component({
  selector: 'app-eliminar-escuelas',
  templateUrl: './eliminar-escuelas.component.html',
  styleUrls: ['./eliminar-escuelas.component.css']
})
export class EliminarEscuelasComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuela,
    public snackBar: MatSnackBar,
    public service: EscuelaService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-escuela').value );
    this.displayedColumns = properties.get('table-eliminar-escuela-col').value;
    this.menuService.add$(properties.get('menu-escuela').value);
  }

  ngOnInit() {

  }
}
