import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PropertiesPlanEstudio } from 'src/app/dashboard/properties/properties-plan-estudio';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { PlanEstudioService } from 'src/app/dashboard/service/dashboard/plan-estudio.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

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
