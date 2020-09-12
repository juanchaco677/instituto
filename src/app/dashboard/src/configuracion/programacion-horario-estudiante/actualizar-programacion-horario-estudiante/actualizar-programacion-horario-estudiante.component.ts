import { MenuService } from './../../../../service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProgramacionHorarioEstudianteService } from './../../../../service/dashboard/programacion-horario-estudiante.service';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { Component, OnInit } from '@angular/core';
import { PropertiesProgramacionHorarioEstudiante } from 'src/app/dashboard/properties/properties-programacion-horario-estudiante';

@Component({
  selector: 'app-actualizar-programacion-horario-estudiante',
  templateUrl: './actualizar-programacion-horario-estudiante.component.html',
  styleUrls: ['./actualizar-programacion-horario-estudiante.component.css']
})
export class ActualizarProgramacionHorarioEstudianteComponent   extends ActualizarBaseComponent
implements OnInit {
constructor(
  public properties: PropertiesProgramacionHorarioEstudiante,
  public service: ProgramacionHorarioEstudianteService,
  public router: Router,
  public route: ActivatedRoute,
  private menuService: MenuService
) {
  super(
    router,
    route,
    service,
    properties.get('route-programacion-horario-estudiante').value,
    properties.get('r-a-programacion-horario-estudiante').route
  );
  this.displayedColumns = properties.get(
    'table-actualizar-programacion-horario-estudiante-col'
  ).value;
  this.menuService.add$(properties.get('menu-programacion-horario-estudiante').value);
}

ngOnInit() {}
}
