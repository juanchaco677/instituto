import { Component, OnInit } from '@angular/core';
import { PropertiesModalidad } from 'src/app/dashboard/properties/properties-modalidad';

@Component({
  selector: 'app-plantilla-modalidad',
  templateUrl: './plantilla-modalidad.component.html',
  styleUrls: ['./plantilla-modalidad.component.css']
})
export class PlantillaModalidadComponent implements OnInit {

  constructor(
     public properties: PropertiesModalidad
  ) { }

  ngOnInit(): void {
  }

}
