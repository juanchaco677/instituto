import { AnyPagination } from './../../../../modelo/anyPagination';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesAsigProfeAsigs } from 'src/app/dashboard/properties/properties-asig-profe-asigs';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { AsigProfeAsigsService } from 'src/app/dashboard/service/dashboard/asig-profe-asigs.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-actualizar-asig-profe-asigs',
  templateUrl: './actualizar-asig-profe-asigs.component.html',
  styleUrls: ['./actualizar-asig-profe-asigs.component.css']
})
export class ActualizarAsigProfeAsigsComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesAsigProfeAsigs,
    public service: AsigProfeAsigsService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-asig-profe-asigs').value , properties.get('r-a-asig-profe-asigs').route);
    this.displayedColumns = properties.get('table-actualizar-asig-profe-asigs-col').value;
    this.menuService.add$(properties.get('menu-asig-profe-asigs').value);
  }

  ngOnInit() {

  }
}
