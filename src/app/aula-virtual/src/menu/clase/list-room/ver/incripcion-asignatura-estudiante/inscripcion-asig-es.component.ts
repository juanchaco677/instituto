import { PropertiesListRoom } from './../../../../../../properties/properties-list-room';
import { MenuService } from '../../../../../../../dashboard/service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ListRoomService } from '../../../../../../service/list-room.service';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseRedireccionarComponent } from 'src/app/dashboard/modelo/actualizar-base-redireccionar-component';

@Component({
  selector: 'app-inscripcion-asig-es',
  templateUrl: './inscripcion-asig-es.component.html',
  styleUrls: ['./inscripcion-asig-es.component.css'],
})
export class InscripcionAsigEsComponent
  extends ActualizarBaseRedireccionarComponent
  implements OnInit {
  constructor(
    public properties: PropertiesListRoom,
    public service: ListRoomService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService
  ) {
    super(
      router,
      route,
      service,
      properties.get('route-programacion-horario-estudiante').value,
      properties.get('route-redirect-web').route
    );
    this.displayedColumns = this.properties.get(
      'table-ver-programacion-horario-estudiante-col'
    ).value;
    this.menuService.add$(properties.get('menu-programacion-horario-estudiante').value);
  }

  ngOnInit() {}
}
