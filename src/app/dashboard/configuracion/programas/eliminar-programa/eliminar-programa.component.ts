import { MenuService } from './../../../../service/menu.service';
import { PropertiesPrograma } from 'src/app/properties/properties-programa';
import { EliminarBaseComponent } from './../../../../modelo/eliminar-base-component';
import { AnyPagination } from './../../../../modelo/anyPagination';
import { Util } from './../../../../utils/util';
import { ProgramaService } from './../../../../service/dashboard/programa.service';
import { MateriaService } from './../../../../service/dashboard/materia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { PaginationMaterial } from './../../../../paginationmaterial';
import { MatTableDataSource } from '@angular/material/table';
import { Programa } from './../../../../modelo/programa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-programa',
  templateUrl: './eliminar-programa.component.html',
  styleUrls: ['./eliminar-programa.component.css']
})
export class EliminarProgramaComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesPrograma,
    public snackBar: MatSnackBar,
    public service: ProgramaService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('r-programa').value );
    this.displayedColumns = properties.get('t-e-programa-col').value;
    this.menuService.add$(properties.get('m-t-programa').value);
  }

  ngOnInit() {

  }
}
