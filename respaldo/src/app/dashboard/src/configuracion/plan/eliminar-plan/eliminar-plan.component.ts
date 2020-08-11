import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { PropertiesPlan } from 'src/app/dashboard/properties/properties-plan';
import { PlanService } from 'src/app/dashboard/service/dashboard/plan.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-plan',
  templateUrl: './eliminar-plan.component.html',
  styleUrls: ['./eliminar-plan.component.css']
})
export class EliminarPlanComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesPlan,
    public snackBar: MatSnackBar,
    public service: PlanService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('r-plan').value );
    this.displayedColumns = properties.get('t-e-plan-col').value;
    this.menuService.add$(properties.get('m-t-plan').value);
  }

  ngOnInit() {

  }

}
