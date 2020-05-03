import { PropertiesEscuelaUsuarios } from './../../../../properties/properties-escuela-usuarios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-escuela-usuario',
  templateUrl: './plantilla-escuela-usuario.component.html',
  styleUrls: ['./plantilla-escuela-usuario.component.css']
})
export class PlantillaEscuelaUsuarioComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuelaUsuarios

  ) { }

  ngOnInit(): void {
  }

}
