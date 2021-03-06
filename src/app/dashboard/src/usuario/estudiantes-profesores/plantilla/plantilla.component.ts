import { PropertiesUsuario } from '../../../../properties/properties-usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.css']
})
export class PlantillaComponent implements OnInit {
  tipo: string;
  constructor(
    private route: ActivatedRoute,
    public properties: PropertiesUsuario,
    ) {

    this.route.paramMap.subscribe(params => {
      this.tipo = params.get('tipo');
    });

  }

  ngOnInit() {

  }
}
