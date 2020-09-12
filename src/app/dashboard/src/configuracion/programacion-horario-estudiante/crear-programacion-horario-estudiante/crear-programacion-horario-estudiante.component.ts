import { ActualizarUsuarioComponent } from './../../../usuario/estudiantes-profesores/actualizar/actualizar-usuario.component';
import { Usuario } from './../../../../modelo/usuario';
import { Validacion } from './../../../../../utils/validacion';
import { Util } from './../../../../../utils/util';
import { MenuService } from './../../../../service/menu.service';
import { ActivatedRoute } from '@angular/router';
import { ProgramacionHorarioEstudianteService } from './../../../../service/dashboard/programacion-horario-estudiante.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesProgramacionHorarioEstudiante } from './../../../../properties/properties-programacion-horario-estudiante';
import { MatDialog } from '@angular/material/dialog';
import { ProgramacionHorarioEstudiante } from './../../../../modelo/programacion-horario-estudiante';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Component, OnInit } from '@angular/core';
import { ActualizarProgramacionHorarioComponent } from '../../programacion-horarios/actualizar-programacion-horario/actualizar-programacion-horario.component';
import { ProgramacionHorario } from 'src/app/dashboard/modelo/programacion-horario';

@Component({
  selector: 'app-crear-programacion-horario-estudiante',
  templateUrl: './crear-programacion-horario-estudiante.component.html',
  styleUrls: ['./crear-programacion-horario-estudiante.component.css'],
})
export class CrearProgramacionHorarioEstudianteComponent
  extends CrearBaseComponent
  implements OnInit {
  programacionHorarioEstudiante: ProgramacionHorarioEstudiante;

  constructor(
    public dialog: MatDialog,
    public properties: PropertiesProgramacionHorarioEstudiante,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: ProgramacionHorarioEstudianteService,
    public route: ActivatedRoute,
    private menuService: MenuService
  ) {
    super(route, service, snackBar);

    this.menuService.add$(
      properties.get('menu-programacion-horario-estudiante').value
    );

    this.programacionHorarioEstudiante = new ProgramacionHorarioEstudiante();

    this.programacionHorarioEstudiante = !Util.empty(this.data)
      ? this.data
      : this.programacionHorarioEstudiante;

    this.crear = this.formBuilder.group({
      estudiante: Validacion.getCampoLetras(true),
      profesor: Validacion.getCampoLetras(true),
      materia: Validacion.getCampoLetras(true),
      salon: Validacion.getCampo(true),
      hora_inicial: Validacion.getCampo(true),
      hora_final: Validacion.getCampo(true),
    });
  }
  ngOnInit(): void {}

  openDialogProgramacionHorario(){
    const dialogRef = this.dialog.open(ActualizarProgramacionHorarioComponent, {
      width: '80%',
    });
    dialogRef.componentInstance.combobox = true;

    dialogRef.componentInstance.out.subscribe((element: ProgramacionHorario) => {
      const programacionHorario = new ProgramacionHorario(
        element.asig_profe_asig ,
        element.id,
        element.dia,
        element.hora_inicial,
        element.hora_final,
        element.fecha_inicial,
        element.fecha_final,
        element.created_at,
        element.updated_at
      );
      this.programacionHorarioEstudiante.programacion_horario = programacionHorario;
      dialogRef.close();
    });
  }

  openDialogEstudiante(): void {
    const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.tipo = 'ES';
    dialogRef.componentInstance.combobox = true;
    if (Util.empty(dialogRef.componentInstance.service.listPagination$)) {
      dialogRef.componentInstance.consultarDatos(0, '');
    } else {
      dialogRef.componentInstance.consultarDatosEnMemoria();
    }
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
      this.programacionHorarioEstudiante.estudiante = usuario;
      dialogRef.close();
    });
  }

  onSubmit() {
    this.onSubmit$(
      this.properties.get('route-programacion-horario-estudiante').value,
      this.programacionHorarioEstudiante
    );
  }
}
