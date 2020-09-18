import { Sesion } from './../../../../../utils/sesion';
import { MenuService } from './../../../../../dashboard/service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ForoAulaMateriaService } from './../../../../service/foro-aula-materia.service';
import { PropertiesForoAualaMateria } from './../../../../properties/properties-foro-aula-materia';
import { ActualizarBaseComponent } from './../../../../../dashboard/modelo/actualizar-base-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foro-materia',
  templateUrl: './foro-materia.component.html',
  styleUrls: ['./foro-materia.component.css']
})
export class ForoMateriaComponent extends ActualizarBaseComponent {

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
      properties.get('route-foro-aula-comentario').value,
      true,
      Sesion.userAulaChat()
    );
    this.displayedColumns = properties.get(
      'table-ver-foro-aula-materia-col'
    ).value;
    this.menuService.add$(properties.get('menu-foro-aula-materia').value);
  }

}
