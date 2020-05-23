import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plantilla-crud',
  templateUrl: './plantilla-crud.component.html',
  styleUrls: ['./plantilla-crud.component.css']
})
export class PlantillaCRUDComponent implements OnInit {
  @Input() titulo: string;
  @Input() subtitulo: string;
  @Input() descripcion: string;
  @Input() ruta: string;
  @Input() parameter: string;
  constructor() { }

  ngOnInit(): void {

  }

}
