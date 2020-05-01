import { PropertiesPlan } from './../../../../properties/properties-plan';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-plan',
  templateUrl: './plantilla-plan.component.html',
  styleUrls: ['./plantilla-plan.component.css']
})
export class PlantillaPlanComponent implements OnInit {

  constructor(public properties: PropertiesPlan) {

   }

  ngOnInit(): void {
  }

}
