import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from './../../../../service/menu.service';
import { ProgramacionHorarioEstudianteService } from './../../../../service/dashboard/programacion-horario-estudiante.service';
import { PropertiesProgramacionHorarioEstudiante } from 'src/app/dashboard/properties/properties-programacion-horario-estudiante';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-programacion-horario-estudiante',
  templateUrl: './eliminar-programacion-horario-estudiante.component.html',
  styleUrls: ['./eliminar-programacion-horario-estudiante.component.css']
})
export class EliminarProgramacionHorarioEstudianteComponent extends EliminarBaseComponent
implements OnInit {
constructor(
  public properties: PropertiesProgramacionHorarioEstudiante,
  public snackBar: MatSnackBar,
  public service: ProgramacionHorarioEstudianteService,
  private menuService: MenuService
) {
  super(
    snackBar,
    service,
    properties.get('route-programacion-horario-estudiante').value
  );
  this.displayedColumns = properties.get(
    'table-eliminar-programacion-horario-estudiante-col'
  ).value;
  this.menuService.add$(properties.get('menu-programacion-horario-estudiante').value);
}

ngOnInit() {}
}
