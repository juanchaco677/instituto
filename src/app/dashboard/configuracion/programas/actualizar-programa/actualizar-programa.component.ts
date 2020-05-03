import { MenuService } from './../../../../service/menu.service';
import { PropertiesPrograma } from 'src/app/properties/properties-programa';
import { ActualizarBaseComponent } from './../../../../modelo/actualizar-base-component';
import { AnyPagination } from './../../../../modelo/anyPagination';
import { Util } from './../../../../utils/util';
import { Router, ActivatedRoute } from '@angular/router';
import { ProgramaService } from './../../../../service/dashboard/programa.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Programa } from './../../../../modelo/programa';
import { PaginationMaterial } from './../../../../paginationmaterial';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actualizar-programa',
  templateUrl: './actualizar-programa.component.html',
  styleUrls: ['./actualizar-programa.component.css']
})
export class ActualizarProgramaComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesPrograma,
    public programaService: ProgramaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , programaService , properties.get('r-programa').value, properties.get('r-a-programa').route);

    this.displayedColumns = properties.get('t-a-programa-col').value;
    this.menuService.add$(properties.get('m-t-programa').value);

  }

  ngOnInit() {

  }
}
