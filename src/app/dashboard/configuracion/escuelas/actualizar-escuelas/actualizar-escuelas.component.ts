import { MenuService } from './../../../../service/menu.service';
import { PropertiesEscuela } from './../../../../properties/properties-escuelas';
import { ActualizarBaseComponent } from './../../../../modelo/actualizar-base-component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Escuela } from 'src/app/modelo/escuela';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { EscuelaService } from 'src/app/service/dashboard/escuela.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Sede } from 'src/app/modelo/sede';
@Component({
  selector: 'app-actualizar-escuelas',
  templateUrl: './actualizar-escuelas.component.html',
  styleUrls: ['./actualizar-escuelas.component.css']
})
export class ActualizarEscuelasComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuela,
    public service: EscuelaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router, route, service, properties.get('route-escuela').value, properties.get('r-a-escuela').route);

    this.displayedColumns = properties.get('table-actualizar-escuela-col').value;
    this.menuService.add$(properties.get('menu-escuela').value);

  }

  ngOnInit() {

  }
}
