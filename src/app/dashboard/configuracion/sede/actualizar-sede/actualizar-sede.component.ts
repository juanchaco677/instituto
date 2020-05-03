import { MenuService } from './../../../../service/menu.service';
import { PropertiesSede } from './../../../../properties/properties-sede';
import { ActualizarBaseComponent } from './../../../../modelo/actualizar-base-component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sede } from 'src/app/modelo/sede';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Localizacion } from 'src/app/modelo/localizacion';
import { SedeService } from 'src/app/service/dashboard/sede.service';

@Component({
  selector: 'app-actualizar-sede',
  templateUrl: './actualizar-sede.component.html',
  styleUrls: ['./actualizar-sede.component.css']
})
export class ActualizarSedeComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesSede,
    public service: SedeService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router, route, service, properties.get('route-sede').value, properties.get('r-a-sede').route);

    this.displayedColumns = properties.get('table-actualizar-sede-col').value;
    this.menuService.add$(properties.get('menu-sede').value);

  }

  ngOnInit() {

  }
}
