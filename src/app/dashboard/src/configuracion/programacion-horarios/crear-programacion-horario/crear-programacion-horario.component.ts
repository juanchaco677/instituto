import { AsigProfeAsigs } from './../../../../modelo/asig-profe-asigs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProgramacionHorario } from './../../../../modelo/programacion-horario';
import { CrearBaseComponent } from './../../../../modelo/crear-base-component';
import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { ActualizarAsigProfeAsigsComponent } from '../../asig-profe-asigs/actualizar-asig-profe-asigs/actualizar-asig-profe-asigs.component';
import { PropertiesProgramacionHorario } from 'src/app/dashboard/properties/properties-programacion-horario';
import { ProgramacionHorarioService } from 'src/app/dashboard/service/dashboard/programacion-horario.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Programa } from 'src/app/dashboard/modelo/programa';
import { Plan } from 'src/app/dashboard/modelo/plan';
import { Materia } from 'src/app/dashboard/modelo/materia';
import { Usuario } from 'src/app/dashboard/modelo/usuario';
import { Salon } from 'src/app/dashboard/modelo/salon';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';

@Component({
  selector: 'app-crear-programacion-horario',
  templateUrl: './crear-programacion-horario.component.html',
  styleUrls: ['./crear-programacion-horario.component.css']
})
export class CrearProgramacionHorarioComponent extends CrearBaseComponent implements OnInit {
  programacionHorario: ProgramacionHorario;
  dialogRef: any;
  constructor(
    public dialog: MatDialog,
    public properties: PropertiesProgramacionHorario,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: ProgramacionHorarioService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-titulo-materia-linea').value);
    const asigProfeAsigs = new AsigProfeAsigs(new Programa(), new Plan(), new Materia(), new Usuario(), new Salon());
    this.programacionHorario = new ProgramacionHorario(asigProfeAsigs);

    this.programacionHorario = !Util.empty(this.data) ? this.data : this.programacionHorario;

    this.crear = this.formBuilder.group({
      programa: Validacion.getCampoLetras(true),
      plan: Validacion.getCampoLetras(true),
      materia: Validacion.getCampoLetras(true),
      profesor: Validacion.getCampo(false),
      salon: Validacion.getCampoLetras(true),
      cupos: Validacion.getCampoNumero(true, 1, 2),
      grupo: Validacion.getCampoNumero(true, 1, 1),
      dia: Validacion.getCampoLetras(true),
      horaInicial: Validacion.getCampo(true),
      horaFinal: Validacion.getCampo(true),
      fechaFinal: Validacion.getCampo(true),
      fechaInicial: Validacion.getCampo(true),
    });

  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.programacionHorario.fecha_final.setHours(18);
    this.programacionHorario.fecha_final.setMinutes(59);
    this.programacionHorario.fecha_final.setSeconds(0);
    this.onSubmit$(this.properties.get('route-programacion-horario').value, this.programacionHorario);
  }


  openDialog(): void {
    this.dialogRef = this.dialog.open(ActualizarAsigProfeAsigsComponent, {
      width: '950px',
    });
    // this.dialogRef.componentInstance.consultarDatos(0, this.dialogRef.componentInstance.searchValue);
    this.dialogRef.componentInstance.combobox = true;
    this.dialogRef.componentInstance.out.subscribe((element) => {
      const asig_profe_asig = new AsigProfeAsigs(
        element.programa,
        element.plan,
        element.materia,
        element.profesor,
        element.salon,
        element.id,
        element.cupos,
        element.grupo,
        element.created_at,
        element.updated_at
      );
      this.programacionHorario.asig_profe_asig = asig_profe_asig;

      this.dialogRef.close();
    });
  }


}










