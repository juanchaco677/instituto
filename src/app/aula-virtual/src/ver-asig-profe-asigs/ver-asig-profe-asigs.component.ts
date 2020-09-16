import { MenuService } from './../../../dashboard/service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AsigProfeAsigsService } from './../../../dashboard/service/dashboard/asig-profe-asigs.service';
import { PropertiesAsigProfeAsigs } from './../../../dashboard/properties/properties-asig-profe-asigs';
import { ActualizarBaseRedireccionarComponent } from './../../../dashboard/modelo/actualizar-base-redireccionar-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-asig-profe-asigs',
  templateUrl: './ver-asig-profe-asigs.component.html',
  styleUrls: ['./ver-asig-profe-asigs.component.css']
})
export class VerAsigProfeAsigsComponent extends ActualizarBaseRedireccionarComponent implements OnInit {
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
