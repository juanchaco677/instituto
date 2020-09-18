import { ForoAulaMateria } from './../../../../model/foro-aula-materia';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-plantilla-foro-aula-materia',
  templateUrl: './plantilla-foro-aula-materia.component.html',
  styleUrls: ['./plantilla-foro-aula-materia.component.css'],
})
export class PlantillaForoAulaMateriaComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: any;
  @ViewChild('htmlCrear') htmlCrear: any;
  titleTap = 'Crear';
  constructor() {}

  ngOnInit(): void {}

  cambiarTap(tap: any) {
    if (tap > 0) {
      this.htmlCrear.actCrear = false;
      this.htmlCrear.addElement(new ForoAulaMateria());
      this.titleTap = 'Crear';
    }
  }
}
