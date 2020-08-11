import { PropertiesNoticia } from './../../../../properties/properties-noticia';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-noticia',
  templateUrl: './plantilla-noticia.component.html',
  styleUrls: ['./plantilla-noticia.component.css']
})
export class PlantillaNoticiaComponent implements OnInit {

  constructor(
    public properties: PropertiesNoticia
  ) { }

  ngOnInit(): void {
  }

}
