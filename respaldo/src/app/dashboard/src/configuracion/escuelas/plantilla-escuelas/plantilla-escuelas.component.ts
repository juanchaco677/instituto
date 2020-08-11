import { Component, OnInit } from '@angular/core';
import { PropertiesEscuela } from 'src/app/dashboard/properties/properties-escuelas';

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
