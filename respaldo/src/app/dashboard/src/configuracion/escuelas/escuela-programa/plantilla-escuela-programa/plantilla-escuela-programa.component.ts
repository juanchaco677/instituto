import { Component, OnInit } from '@angular/core';
import { PropertiesEscuelaPrograma } from 'src/app/dashboard/properties/properties-escuela-programa';

@Component({
  selector: 'app-plantilla-escuela-programa',
  templateUrl: './plantilla-escuela-programa.component.html',
  styleUrls: ['./plantilla-escuela-programa.component.css']
})
export class PlantillaEscuelaProgramaComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuelaPrograma
  ) { }

  ngOnInit(): void {
  }

}
