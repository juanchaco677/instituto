import { Component, OnInit } from '@angular/core';
import { PropertiesMateriaLinea } from 'src/app/dashboard/properties/properties-materias-linea';

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
