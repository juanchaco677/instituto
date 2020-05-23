import { PropertiesSede } from './../../../../properties/properties-sede';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-sede',
  templateUrl: './plantilla-sede.component.html',
  styleUrls: ['./plantilla-sede.component.css']
})
export class PlantillaSedeComponent implements OnInit {

  constructor(
    public properties: PropertiesSede
  ) { }

  ngOnInit(): void {
  }

}
