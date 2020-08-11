import { Component, OnInit } from '@angular/core';
import { PropertiesPlan } from 'src/app/dashboard/properties/properties-plan';

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
