import { AsigEstudianteAsigsService } from './../../../../service/dashboard/asig-estudiante-asigs.service';
import { Salon } from './../../../../modelo/salon';
import { ActualizarSalonComponent } from './../../salones/actualizar-salon/actualizar-salon.component';
import { Usuario } from './../../../../modelo/usuario';
import { ActualizarUsuarioComponent } from './../../../usuario/estudiantes-profesores/actualizar/actualizar-usuario.component';
import { Materia } from './../../../../modelo/materia';
import { Programa } from './../../../../modelo/programa';
import { ActualizarProgramaComponent } from './../../programas/actualizar-programa/actualizar-programa.component';
import { ActualizarMateriasComponent } from './../../materias/actualizar-materias/actualizar-materias.component';
import { Plan } from './../../../../modelo/plan';
import { ActualizarPlanComponent } from './../../plan/actualizar-plan/actualizar-plan.component';
import { Validacion } from './../../../../../utils/validacion';
import { Util } from './../../../../../utils/util';
import { AsigEstudianteAsigs } from './../../../../modelo/asig-estudiante-asigs';
import { MenuService } from './../../../../service/menu.service';
import { ActivatedRoute } from '@angular/router';
import { PlanEstudioService } from './../../../../service/dashboard/plan-estudio.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CrearBaseComponent } from './../../../../modelo/crear-base-component';
import { PropertiesAsigEstudianteAsigs } from './../../../../properties/properties-asig-estudiante-asigs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-asig-estudiante-asigs',
  templateUrl: './crear-asig-estudiante-asigs.component.html',
  styleUrls: ['./crear-asig-estudiante-asigs.component.css'],
})
export class CrearAsigEstudianteAsigsComponent
  extends CrearBaseComponent
  implements OnInit {
  asigEstudianteAsigs: AsigEstudianteAsigs;
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: AsigEstudianteAsigsService,
    public route: ActivatedRoute,
    private menuService: MenuService,
    public properties: PropertiesAsigEstudianteAsigs
  ) {
    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-asig-estudiante-asigs').value);

    this.asigEstudianteAsigs = new AsigEstudianteAsigs();
    this.asigEstudianteAsigs = !Util.empty(this.data)
      ? this.data
      : this.asigEstudianteAsigs;

    this.crear = this.formBuilder.group({
      programa: Validacion.getCampoLetras(true),
      plan: Validacion.getCampoLetras(true),
      materia: Validacion.getCampoLetras(true),
      estudiante: Validacion.getCampo(true),
      periodo: Validacion.getCampoNumero(true, 1, 1),
      ano: Validacion.getCampoNumero(true, 4, 4),
      profesor: Validacion.getCampo(false),
      salon: Validacion.getCampo(false),
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
      this.asigEstudianteAsigs.programa = programa;
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
      this.asigEstudianteAsigs.materia = materia;
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
      this.asigEstudianteAsigs.plan = plan;
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
      this.asigEstudianteAsigs.estudiante = usuario;
      dialogRef.close();
    });
  }

  openDialogProfesor(): void {
    const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.tipo = 'PR';
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
      this.asigEstudianteAsigs.profesor = usuario;
      dialogRef.close();
    });
  }

  openDialogSalon(): void {
    const dialogRef = this.dialog.open(ActualizarSalonComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const salon = new Salon(
        element.sede,
        element.id,
        element.nombre,
        element.created_at,
        element.updated_at
      );
      this.asigEstudianteAsigs.salon = salon;
      dialogRef.close();
    });
  }
  onSubmit() {
    this.onSubmit$(
      this.properties.get('route-asig-estudiante-asigs').value,
      this.asigEstudianteAsigs
    );
  }
}
