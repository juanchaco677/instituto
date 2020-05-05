import { PropertiesPlanEstudio } from './../../../../../properties/properties-plan-estudio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-plan-estudio',
  templateUrl: './plantilla-plan-estudio.component.html',
  styleUrls: ['./plantilla-plan-estudio.component.css']
})
export class PlantillaPlanEstudioComponent implements OnInit {

  constructor(
    public properties: PropertiesPlanEstudio
  ) { }

  ngOnInit(): void {
  }

}
