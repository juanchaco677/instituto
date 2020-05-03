import { MenuService } from './../../../../service/menu.service';
import { PropertiesMateria } from 'src/app/properties/properties-materias';
import { ActualizarBaseComponent } from './../../../../modelo/actualizar-base-component';
import { MateriaService } from './../../../../service/dashboard/materia.service';
import { Materia } from './../../../../modelo/materia';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PaginationMaterial } from 'src/app/paginationmaterial';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';

@Component({
  selector: 'app-actualizar-materias',
  templateUrl: './actualizar-materias.component.html',
  styleUrls: ['./actualizar-materias.component.css']
})
export class ActualizarMateriasComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesMateria,
    public service: MateriaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-materia').value , properties.get('r-a-asignatura').route);
    this.displayedColumns = properties.get('table-actualizar-materia-col').value;
    this.menuService.add$(properties.get('menu-materia').value);

  }

  ngOnInit() {

  }
}
