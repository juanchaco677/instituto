import { Plan } from './../../../../../modelo/plan';
import { ActualizarPlanComponent } from './../../actualizar-plan/actualizar-plan.component';
import { Materia } from 'src/app/modelo/materia';
import { ActualizarMateriasComponent } from 'src/app/dashboard/configuracion/materias/actualizar-materias/actualizar-materias.component';
import { Programa } from './../../../../../modelo/programa';
import { ActualizarProgramaComponent } from './../../../programas/actualizar-programa/actualizar-programa.component';
import { MatDialog } from '@angular/material/dialog';
import { Validacion } from 'src/app/utils/validacion';
import { Util } from 'src/app/utils/util';
import { MenuService } from './../../../../../service/menu.service';
import { ActivatedRoute } from '@angular/router';
import { PlanEstudioService } from './../../../../../service/dashboard/plan-estudio.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesPlanEstudio } from './../../../../../properties/properties-plan-estudio';
import { CrearBaseComponent } from './../../../../../modelo/crear-base-component';
import { Component, OnInit } from '@angular/core';
import { PlanEstudio } from 'src/app/modelo/plan-estudio';

@Component({
  selector: 'app-crear-plan-estudio',
  templateUrl: './crear-plan-estudio.component.html',
  styleUrls: ['./crear-plan-estudio.component.css']
})
export class CrearPlanEstudioComponent  extends CrearBaseComponent implements OnInit {
  planEstudio: PlanEstudio;
  constructor(
    public dialog: MatDialog,
    public properties: PropertiesPlanEstudio,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: PlanEstudioService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {

    super(route , service , snackBar);
    this.route.paramMap.subscribe(params => {
      const compoundKey = params.get('compoundKey');
      if (!Util.empty(compoundKey)) {
        this.actCrear = true;
        this.data = this.service.buscarElementList$({ id: compoundKey});
      }
    });
    this.menuService.add$(properties.get('menu-plan-estudio').value);

    this.planEstudio = new PlanEstudio(new Programa(), new Materia(), null , new Plan());

    this.planEstudio = !Util.empty(this.data) ? this.data : this.planEstudio;

    this.crear = this.formBuilder.group({
      programa: Validacion.getCampoLetras(true),
      materia: Validacion.getCampoLetras(true),
      plan: Validacion.getCampoLetras(true),
      fechaInicial: Validacion.getCampoNumero(true, 1 , 8),
      fechaHasta: Validacion.getCampoNumero(true, 1 , 8),
      periodo: Validacion.getCampoNumero(true, 1 , 0),
    });
  }

  ngOnInit(): void {

  }

  openDialogPrograma(): void {
    const dialogRef = this.dialog.open(ActualizarProgramaComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const programa = new Programa(
        element.id,
        element.nombre
      );
      this.planEstudio.programa = programa;
      dialogRef.close();
    });
  }

  openDialogMateria(): void {
    const dialogRef = this.dialog.open(ActualizarMateriasComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const materia = new Materia(
        element.id,
        element.nombre,
        element.credito,
        element.created_at,
        element.updated_at
      );
      this.planEstudio.materia = materia;
      dialogRef.close();
    });
  }

  openDialogPlan(): void {
    const dialogRef = this.dialog.open(ActualizarPlanComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const plan = new Plan(
        element.id,
        element.nombre,
        element.created_at,
        element.updated_at
      );
      this.planEstudio.plan = plan;
      dialogRef.close();
    });
  }

  onSubmit() {
    this.onSubmit$(this.properties.get('route-plan-estudio').value , this.planEstudio);
  }
}
