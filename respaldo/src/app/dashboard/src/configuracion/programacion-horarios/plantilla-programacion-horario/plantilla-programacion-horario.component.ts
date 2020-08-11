import { Component, OnInit } from '@angular/core';
import { PropertiesProgramacionHorario } from 'src/app/dashboard/properties/properties-programacion-horario';

@Component({
  selector: 'app-plantilla-programacion-horario',
  templateUrl: './plantilla-programacion-horario.component.html',
  styleUrls: ['./plantilla-programacion-horario.component.css']
})
export class PlantillaProgramacionHorarioComponent implements OnInit {

  constructor(
    public properties: PropertiesProgramacionHorario
  ) { }

  ngOnInit(): void {
  }

}
