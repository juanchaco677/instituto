import { PropertiesMateria } from 'src/app/dashboard/properties/properties-materias';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { MateriaService } from 'src/app/dashboard/service/dashboard/materia.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-materias',
  templateUrl: './actualizar-materias.component.html',
  styleUrls: ['./actualizar-materias.component.css']
})
export class ActualizarMateriasComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesMateria,
    public service: MateriaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-materia').value , properties.get('r-a-asignatura').route);
    this.displayedColumns = properties.get('table-actualizar-materia-col').value;
    this.menuService.add$(properties.get('menu-materia').value);

  }

  ngOnInit() {

  }
}
