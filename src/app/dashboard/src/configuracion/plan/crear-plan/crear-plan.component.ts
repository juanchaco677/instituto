import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Plan } from 'src/app/dashboard/modelo/plan';
import { PropertiesPlan } from 'src/app/dashboard/properties/properties-plan';
import { PlanService } from 'src/app/dashboard/service/dashboard/plan.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';

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
