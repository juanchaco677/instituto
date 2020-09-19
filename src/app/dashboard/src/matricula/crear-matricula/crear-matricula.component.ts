import { Sede } from './../../../modelo/sede';
import { ActualizarSedeComponent } from './../../configuracion/sede/actualizar-sede/actualizar-sede.component';
import { Escuela } from './../../../modelo/escuela';
import { ActualizarEscuelasComponent } from './../../configuracion/escuelas/actualizar-escuelas/actualizar-escuelas.component';
import { Usuario } from './../../../modelo/usuario';
import { ActualizarUsuarioComponent } from './../../usuario/estudiantes-profesores/actualizar/actualizar-usuario.component';
import { Plan } from './../../../modelo/plan';
import { ActualizarPlanComponent } from './../../configuracion/plan/actualizar-plan/actualizar-plan.component';
import { Programa } from './../../../modelo/programa';
import { ActualizarProgramaComponent } from './../../configuracion/programas/actualizar-programa/actualizar-programa.component';
import { Validacion } from './../../../../utils/validacion';
import { Util } from './../../../../utils/util';
import { MenuService } from './../../../service/menu.service';
import { PropertiesMatricula } from './../../../properties/properties-matricula';
import { ActivatedRoute } from '@angular/router';
import { MatriculaService } from './../../../service/dashboard/matricula.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Matricula } from './../../../modelo/matricula';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-matricula',
  templateUrl: './crear-matricula.component.html',
  styleUrls: ['./crear-matricula.component.css'],
})
export class CrearMatriculaComponent
  extends CrearBaseComponent
  implements OnInit {
  matricula: Matricula;
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: MatriculaService,
    public route: ActivatedRoute,
    private menuService: MenuService,
    public properties: PropertiesMatricula
  ) {
    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-matricula').value);

    this.matricula = new Matricula();
    this.matricula = !Util.empty(this.data) ? this.data : this.matricula;

    this.crear = this.formBuilder.group({
      programa: Validacion.getCampoLetras(true),
      plan: Validacion.getCampoLetras(true),
      escuela: Validacion.getCampoLetras(true),
      sede: Validacion.getCampoLetras(true),
      estudiante: Validacion.getCampo(true),
      periodo: Validacion.getCampoNumero(true, 1, 1),
      ano: Validacion.getCampoNumero(true, 4, 4),
    });
  }

  ngOnInit(): void {}

  openDialogPrograma(): void {
    const dialogRef = this.dialog.open(ActualizarProgramaComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const programa = new Programa(element.id, element.nombre);
      this.matricula.programa = programa;
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
      this.matricula.plan = plan;
      dialogRef.close();
    });
  }

  openDialogEscuela(): void {
    const dialogRef = this.dialog.open(ActualizarEscuelasComponent, {
      width: '950px',
    });

    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element: Escuela) => {
      const escuela = new Escuela(
        element.sede,
        +element.id,
        element.nombre,
        element.created_at,
        element.updated_at
      );
      this.matricula.escuela = escuela;
      dialogRef.close();
    });
  }
  openDialogEstudiante(): void {
    const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.tipo = 'ES';
    dialogRef.componentInstance.combobox = true;

    dialogRef.componentInstance.consultarDatos(0, '');

    dialogRef.componentInstance.out.subscribe((element: Usuario) => {
      const usuario = new Usuario(
        element.email,
        null,
        element.id,
        element.nombre,
        element.nombre_uno,
        element.nombre_dos,
        element.apellido_uno,
        element.apellido_dos,
        element.tipo,
        element.cedula,
        element.telefono,
        element.celular,
        element.fechanacimiento,
        element.foto,
        element.sex,
        element.created_at,
        element.updated_at,
        null,
        element.localizacion
      );
      this.matricula.estudiante = usuario;
      dialogRef.close();
    });
  }

  openDialogSede(): void {
    const dialogRef = this.dialog.open(ActualizarSedeComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const sede = new Sede(
        element.localizacion,
        element.id,
        element.nombre,
        element.created,
        element.updated
      );
      this.matricula.sede = sede;
      dialogRef.close();
    });
  }
  onSubmit() {
    console.log(this.matricula);
    this.onSubmit$(
      this.properties.get('route-matricula').value,
      this.matricula
    );
  }
}
