import { PlantillaForoAulaMateriaComponent } from './../plantilla-foro-aula-materia/plantilla-foro-aula-materia.component';
import { AnyPagination } from './../../../../../dashboard/modelo/anyPagination';
import { Sesion } from './../../../../../utils/sesion';
import { ActualizarBaseComponent } from './../../../../../dashboard/modelo/actualizar-base-component';
import { MenuService } from './../../../../../dashboard/service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ForoAulaMateriaService } from './../../../../service/foro-aula-materia.service';
import { PropertiesForoAualaMateria } from './../../../../properties/properties-foro-aula-materia';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-actualizar-foro-aula-materia',
  templateUrl: './actualizar-foro-aula-materia.component.html',
  styleUrls: ['./actualizar-foro-aula-materia.component.css'],
})
export class ActualizarForoAulaMateriaComponent extends ActualizarBaseComponent {

  constructor(
    public properties: PropertiesForoAualaMateria,
    public service: ForoAulaMateriaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService
  ) {
    super(
      router,
      route,
      service,
      properties.get('route-foro-aula-materia').value,
      properties.get('r-a-foro-aula-materia').route,
      true,
      Sesion.userAulaChat()
    );
    this.displayedColumns = properties.get(
      'table-actualizar-foro-aula-materia-col'
    ).value;
    this.menuService.add$(properties.get('menu-foro-aula-materia').value);
  }
}
