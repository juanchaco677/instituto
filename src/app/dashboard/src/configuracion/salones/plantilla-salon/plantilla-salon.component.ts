import { PropertiesSalon } from './../../../../properties/properties-';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-salon',
  templateUrl: './plantilla-salon.component.html',
  styleUrls: ['./plantilla-salon.component.css']
})
export class PlantillaSalonComponent implements OnInit {

  constructor(
    public properties: PropertiesSalon
  ) { }

  ngOnInit(): void {
  }

}
