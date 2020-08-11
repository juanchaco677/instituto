import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { PropertiesPlan } from 'src/app/dashboard/properties/properties-plan';
import { PlanService } from 'src/app/dashboard/service/dashboard/plan.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-plan',
  templateUrl: './actualizar-plan.component.html',
  styleUrls: ['./actualizar-plan.component.css']
})
export class ActualizarPlanComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesPlan,
    public planService: PlanService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , planService , properties.get('r-plan').value, properties.get('r-a-plan').route);

    this.displayedColumns = properties.get('t-a-plan-col').value;
    this.menuService.add$(properties.get('m-t-plan').value);

  }

  ngOnInit() {

  }

}
