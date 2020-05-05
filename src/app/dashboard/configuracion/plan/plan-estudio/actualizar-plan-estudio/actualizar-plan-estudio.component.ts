import { MenuService } from './../../../../../service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanEstudioService } from './../../../../../service/dashboard/plan-estudio.service';
import { ActualizarBaseComponent } from './../../../../../modelo/actualizar-base-component';
import { Component, OnInit } from '@angular/core';
import { PropertiesPlanEstudio } from 'src/app/properties/properties-plan-estudio';

@Component({
  selector: 'app-actualizar-plan-estudio',
  templateUrl: './actualizar-plan-estudio.component.html',
  styleUrls: ['./actualizar-plan-estudio.component.css']
})
export class ActualizarPlanEstudioComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesPlanEstudio,
    public service: PlanEstudioService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-plan-estudio').value, properties.get('r-a-plan-estudio').route);

    this.displayedColumns = properties.get('table-actualizar-plan-estudio-col').value;
    this.menuService.add$(properties.get('menu-plan-estudio').value);

  }

  ngOnInit() {

  }
}
