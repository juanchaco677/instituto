import { EliminarBaseComponent } from './../../../../modelo/eliminar-base-component';
import { MenuService } from './../../../../service/menu.service';
import { PropertiesPlan } from '../../../../properties/properties-plan';
import { PlanService } from './../../../../service/dashboard/plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Plan } from './../../../../modelo/plan';
import { PaginationMaterial } from './../../../../paginationmaterial';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-plan',
  templateUrl: './eliminar-plan.component.html',
  styleUrls: ['./eliminar-plan.component.css']
})
export class EliminarPlanComponent extends EliminarBaseComponent implements OnInit {

  paginationMaterial: PaginationMaterial;
  plan: Plan;
  planes: Plan[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<Plan>;
  displayedColumns: string[] ;
  selection = new SelectionModel<Plan>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;

  constructor(
    public properties: PropertiesPlan,
    public snackBar: MatSnackBar,
    public planService: PlanService,
    private menuService: MenuService,
  ) {
    super(snackBar, planService , 'plan' );
    this.displayedColumns = properties.get('t-e-plan-col').value;
    this.menuService.add$(properties.get('m-t-plan').value);
  }

  ngOnInit() {

  }

}
