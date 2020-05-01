import { ActualizarBaseComponent } from './../../../../modelo/actualizar-base-component';
import { MenuService } from './../../../../service/menu.service';
import { PropertiesPlan } from '../../../../properties/properties-plan';
import { PlanService } from './../../../../service/dashboard/plan.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    super(router , route , planService , properties.get('r-plan').value);

    this.displayedColumns = properties.get('t-a-plan-col').value;
    this.menuService.add$(properties.get('m-t-plan').value);

  }

  ngOnInit() {

  }

}
