import { PropertiesProgramacionHorarioEstudiante } from './../../../../properties/properties-programacion-horario-estudiante';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-programacion-horario-estudiante',
  templateUrl: './plantilla-programacion-horario-estudiante.component.html',
  styleUrls: ['./plantilla-programacion-horario-estudiante.component.css'],
})
export class PlantillaProgramacionHorarioEstudianteComponent implements OnInit {
  constructor(public properties: PropertiesProgramacionHorarioEstudiante) {}

  ngOnInit(): void {}
}
