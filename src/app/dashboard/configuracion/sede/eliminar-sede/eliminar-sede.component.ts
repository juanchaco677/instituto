import { MenuService } from './../../../../service/menu.service';
import { PropertiesSede } from './../../../../properties/properties-sede';
import { EliminarBaseComponent } from './../../../../modelo/eliminar-base-component';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
import { Sede } from 'src/app/modelo/sede';
import { Localizacion } from 'src/app/modelo/localizacion';
import { SedeService } from 'src/app/service/dashboard/sede.service';
@Component({
  selector: 'app-eliminar-sede',
  templateUrl: './eliminar-sede.component.html',
  styleUrls: ['./eliminar-sede.component.css']
})
export class EliminarSedeComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesSede,
    public snackBar: MatSnackBar,
    public service: SedeService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-sede').value );
    this.displayedColumns = properties.get('table-eliminar-sede-col').value;
    this.menuService.add$(properties.get('menu-sede').value);
  }

  ngOnInit() {

  }
}
