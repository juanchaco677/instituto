import { PropertiesEscuela } from './../../../../properties/properties-escuelas';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-escuelas',
  templateUrl: './plantilla-escuelas.component.html',
  styleUrls: ['./plantilla-escuelas.component.css']
})
export class PlantillaEscuelasComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuela,

  ) { }

  ngOnInit(): void {
  }

}
