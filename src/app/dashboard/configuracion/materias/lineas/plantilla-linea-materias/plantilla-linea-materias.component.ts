import { PropertiesMateriaLinea } from './../../../../../properties/properties-materias-linea';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-linea-materias',
  templateUrl: './plantilla-linea-materias.component.html',
  styleUrls: ['./plantilla-linea-materias.component.css']
})
export class PlantillaLineaMateriasComponent implements OnInit {

  constructor(
    public properties: PropertiesMateriaLinea

  ) { }

  ngOnInit(): void {
  }

}
