import { ActivatedRoute } from '@angular/router';
import { PropertiesEscuelaUsuarios } from '../../../../properties/properties-escuela-usuarios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-escuela-usuario',
  templateUrl: './plantilla-escuela-usuario.component.html',
  styleUrls: ['./plantilla-escuela-usuario.component.css']
})
export class PlantillaEscuelaUsuarioComponent implements OnInit {
  tipo: string;
  constructor(
    public properties: PropertiesEscuelaUsuarios,
    private route: ActivatedRoute,

  ) {
    this.route.paramMap.subscribe(params => {
      this.tipo = params.get('tipo');
    });

  }

  ngOnInit(): void {
  }

}
