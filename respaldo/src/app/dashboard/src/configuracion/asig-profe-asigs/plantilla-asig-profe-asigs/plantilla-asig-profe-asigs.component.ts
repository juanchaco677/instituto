import { Component, OnInit } from '@angular/core';
import { PropertiesAsigProfeAsigs } from 'src/app/dashboard/properties/properties-asig-profe-asigs';

@Component({
  selector: 'app-plantilla-asig-profe-asigs',
  templateUrl: './plantilla-asig-profe-asigs.component.html',
  styleUrls: ['./plantilla-asig-profe-asigs.component.css']
})
export class PlantillaAsigProfeAsigsComponent implements OnInit {

  constructor(
    public properties: PropertiesAsigProfeAsigs
  ) { }

  ngOnInit(): void {
  }

}
