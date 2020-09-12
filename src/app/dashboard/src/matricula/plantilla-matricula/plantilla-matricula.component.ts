import { PropertiesMatricula } from './../../../properties/properties-matricula';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-matricula',
  templateUrl: './plantilla-matricula.component.html',
  styleUrls: ['./plantilla-matricula.component.css']
})
export class PlantillaMatriculaComponent implements OnInit {

  constructor(
    public properties: PropertiesMatricula
  ) { }

  ngOnInit(): void {
  }
}
