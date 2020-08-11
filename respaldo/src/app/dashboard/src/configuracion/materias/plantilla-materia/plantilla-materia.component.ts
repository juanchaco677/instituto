import { Component, OnInit } from '@angular/core';
import { PropertiesMateria } from 'src/app/dashboard/properties/properties-materias';

@Component({
  selector: 'app-plantilla-materia',
  templateUrl: './plantilla-materia.component.html',
  styleUrls: ['./plantilla-materia.component.css']
})
export class PlantillaMateriaComponent implements OnInit {

  constructor(
    public properties: PropertiesMateria,
  ) { }

  ngOnInit(): void {
  }

}
