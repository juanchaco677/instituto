import { Util } from './../../../../../utils/util';
import { ActualizarBaseComponent } from './../../../../modelo/actualizar-base-component';
import { MenuService } from './../../../../service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AsigEstudianteAsigsService } from './../../../../service/dashboard/asig-estudiante-asigs.service';
import { PropertiesAsigEstudianteAsigs } from './../../../../properties/properties-asig-estudiante-asigs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-asig-estudiante-asigs',
  templateUrl: './actualizar-asig-estudiante-asigs.component.html',
  styleUrls: ['./actualizar-asig-estudiante-asigs.component.css'],
})
export class ActualizarAsigEstudianteAsigsComponent
  extends ActualizarBaseComponent
  implements OnInit {
  constructor(
    public properties: PropertiesAsigEstudianteAsigs,
    public service: AsigEstudianteAsigsService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService
  ) {
    super(
      router,
      route,
      service,
      properties.get('route-asig-estudiante-asigs').value,
      properties.get('r-a-asig-estudiante-asigs').route
    );
    this.displayedColumns = properties.get(
      'table-actualizar-asig-estudiante-asigs-col'
    ).value;
    this.menuService.add$(properties.get('menu-asig-estudiante-asigs').value);
  }

  ngOnInit() {

  }
}
