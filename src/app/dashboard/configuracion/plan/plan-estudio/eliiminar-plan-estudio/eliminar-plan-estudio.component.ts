import { EliminarBaseComponent } from './../../../../../modelo/eliminar-base-component';
import { MenuService } from './../../../../../service/menu.service';
import { PlanEstudioService } from './../../../../../service/dashboard/plan-estudio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesPlanEstudio } from './../../../../../properties/properties-plan-estudio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-plan-estudio',
  templateUrl: './eliminar-plan-estudio.component.html',
  styleUrls: ['./eliminar-plan-estudio.component.css']
})
export class EliminarPlanEstudioComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesPlanEstudio,
    public snackBar: MatSnackBar,
    public service: PlanEstudioService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-plan-estudio').value );
    this.displayedColumns = properties.get('table-eliminar-plan-estudio-col').value;
    this.menuService.add$(properties.get('menu-plan-estudio').value);
  }

  ngOnInit() {

  }

}
