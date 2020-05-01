import { PropertiesPrograma } from './../../../../properties/properties-programa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-programa',
  templateUrl: './plantilla-programa.component.html',
  styleUrls: ['./plantilla-programa.component.css']
})
export class PlantillaProgramaComponent implements OnInit {
  constructor(public properties: PropertiesPrograma) {

  }

 ngOnInit(): void {
 }
}
