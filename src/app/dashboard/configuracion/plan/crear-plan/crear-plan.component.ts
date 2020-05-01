import { CrearBaseComponent } from './../../../../modelo/crear-base-component';
import { MenuService } from './../../../../service/menu.service';
import { PropertiesPlan } from '../../../../properties/properties-plan';
import { Util } from './../../../../utils/util';
import { Validacion } from './../../../../utils/validacion';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from './../../../../service/dashboard/plan.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plan } from './../../../../modelo/plan';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent extends CrearBaseComponent implements OnInit {
  plan: Plan;
  constructor(
    public properties: PropertiesPlan,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public planService: PlanService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {

    super(route , planService, snackBar);

    this.menuService.add$(properties.get('m-t-plan').value);

    this.plan = new Plan();

    this.plan = !Util.empty(this.data) ? this.data : this.plan;

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.onSubmit$(this.properties.get('r-plan').value , this.plan);
  }
}
