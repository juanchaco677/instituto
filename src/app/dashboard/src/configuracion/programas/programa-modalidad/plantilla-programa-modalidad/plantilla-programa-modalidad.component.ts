import { PropertiesProgramaModalidad } from './../../../../../properties/properties-programa-modalidad';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-programa-modalidad',
  templateUrl: './plantilla-programa-modalidad.component.html',
  styleUrls: ['./plantilla-programa-modalidad.component.css']
})
export class PlantillaProgramaModalidadComponent implements OnInit {

  constructor(
    public properties: PropertiesProgramaModalidad
  ) { }

  ngOnInit(): void {
  }

}
