import { MenuService } from './../../../../service/menu.service';
import { PropertiesMateria } from 'src/app/properties/properties-materias';
import { EliminarBaseComponent } from './../../../../modelo/eliminar-base-component';
import { MateriaService } from './../../../../service/dashboard/materia.service';
import { Materia } from './../../../../modelo/materia';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
@Component({
  selector: 'app-eliminar-materias',
  templateUrl: './eliminar-materias.component.html',
  styleUrls: ['./eliminar-materias.component.css']
})
export class EliminarMateriasComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesMateria,
    public snackBar: MatSnackBar,
    public service: MateriaService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-materia').value );
    this.displayedColumns = properties.get('table-eliminar-materia-col').value;
    this.menuService.add$(properties.get('menu-materia').value);
  }

  ngOnInit() {

  }

}
