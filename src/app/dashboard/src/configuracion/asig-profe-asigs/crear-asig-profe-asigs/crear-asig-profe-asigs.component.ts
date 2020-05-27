import { ActualizarSalonComponent } from './../../salones/actualizar-salon/actualizar-salon.component';
import { ActualizarPlanComponent } from './../../plan/actualizar-plan/actualizar-plan.component';
import { ActualizarUsuarioComponent } from './../../../usuario/estudiantes-profesores/actualizar/actualizar-usuario.component';
import { ActualizarProgramaComponent } from './../../programas/actualizar-programa/actualizar-programa.component';
import { ActualizarMateriasComponent } from './../../materias/actualizar-materias/actualizar-materias.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { AsigProfeAsigs } from 'src/app/dashboard/modelo/asig-profe-asigs';
import { Programa } from 'src/app/dashboard/modelo/programa';
import { Plan } from 'src/app/dashboard/modelo/plan';
import { Materia } from 'src/app/dashboard/modelo/materia';
import { Usuario } from 'src/app/dashboard/modelo/usuario';
import { Salon } from 'src/app/dashboard/modelo/salon';
import { PropertiesAsigProfeAsigs } from 'src/app/dashboard/properties/properties-asig-profe-asigs';
import { AsigProfeAsigsService } from 'src/app/dashboard/service/dashboard/asig-profe-asigs.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';
@Component({
  selector: 'app-crear-asig-profe-asigs',
  templateUrl: './crear-asig-profe-asigs.component.html',
  styleUrls: ['./crear-asig-profe-asigs.component.css']
})
export class CrearAsigProfeAsigsComponent extends CrearBaseComponent implements OnInit {
  asigProfeAsigs: AsigProfeAsigs;

  constructor(
    public dialog: MatDialog,
    public properties: PropertiesAsigProfeAsigs,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: AsigProfeAsigsService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-asig-profe-asigs').value);

    this.asigProfeAsigs = new AsigProfeAsigs(new Programa(), new Plan(), new Materia(), new Usuario(), new Salon());

    this.asigProfeAsigs = !Util.empty(this.data) ? this.data : this.asigProfeAsigs;

    if (Util.empty(this.asigProfeAsigs.profesor)) {
      this.asigProfeAsigs.profesor = new Usuario();
    }

    this.crear = this.formBuilder.group({
      programa: Validacion.getCampoLetras(true),
      plan: Validacion.getCampoLetras(true),
      materia: Validacion.getCampoLetras(true),
      profesor: Validacion.getCampo(false),
      salon: Validacion.getCampo(true),
      cupos: Validacion.getCampoNumero(true, 1, 2),
      grupo: Validacion.getCampoNumero(true, 1, 1),
    });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.crear);
    this.onSubmit$(this.properties.get('route-asig-profe-asigs').value, this.asigProfeAsigs);
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
      this.asigProfeAsigs.programa = programa;
      dialogRef.close();
    });
  }

  openDialogProfesor(): void {
    const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.tipo = 'PR';
    dialogRef.componentInstance.combobox = true;
    if (Util.empty(dialogRef.componentInstance.service.listPagination$)) {
      dialogRef.componentInstance.consultarDatos(0, '');
    } else {
      dialogRef.componentInstance.consultarDatosEnMemoria();
    }
    dialogRef.componentInstance.out.subscribe((element) => {
      const usuario = new Usuario(
        element.email,
        element.password,
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
        element.token,
        element.localizacion,
        element.rol,
        element.roles
      );
      this.asigProfeAsigs.profesor = usuario;
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
      this.asigProfeAsigs.plan = plan;
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
      this.asigProfeAsigs.salon = salon;
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
      this.asigProfeAsigs.materia = materia;
      dialogRef.close();
    });
  }
}
