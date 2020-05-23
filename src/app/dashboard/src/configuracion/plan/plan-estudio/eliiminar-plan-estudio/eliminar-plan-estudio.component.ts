import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { PropertiesPlanEstudio } from 'src/app/dashboard/properties/properties-plan-estudio';
import { PlanEstudioService } from 'src/app/dashboard/service/dashboard/plan-estudio.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

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
