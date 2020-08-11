import { PropertiesNivelEducativo } from './../../../../properties/properties-nivel-educativo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-nivel',
  templateUrl: './plantilla-nivel.component.html',
  styleUrls: ['./plantilla-nivel.component.css']
})
export class PlantillaNivelComponent implements OnInit {

  constructor(
    public properties: PropertiesNivelEducativo
  ) { }

  ngOnInit(): void {
  }

}
