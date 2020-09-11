import { PropertiesAsigEstudianteAsigs } from './../../../../properties/properties-asig-estudiante-asigs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-asig-estudiante-asigs',
  templateUrl: './plantilla-asig-estudiante-asigs.component.html',
  styleUrls: ['./plantilla-asig-estudiante-asigs.component.css']
})
export class PlantillaAsigEstudianteAsigsComponent implements OnInit {

  constructor(
    public properties: PropertiesAsigEstudianteAsigs
  ) { }

  ngOnInit(): void {
  }
}
