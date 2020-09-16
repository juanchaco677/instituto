import { PropertiesListRoom } from './../../../../properties/properties-list-room';
import { SalonesEsPrService } from './../../../../service/salones-es-pr.service';
import { Sesion } from './../../../../../utils/sesion';
import { Router, ActivatedRoute } from '@angular/router';
import { ActualizarBaseRedireccionarComponent } from 'src/app/dashboard/modelo/actualizar-base-redireccionar-component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-salones-estudiante-profesor',
  templateUrl: './salones-estudiante-profesor.component.html',
  styleUrls: ['./salones-estudiante-profesor.component.css'],
})
export class SalonesEstudianteProfesorComponent
  extends ActualizarBaseRedireccionarComponent
  implements OnInit {
  constructor(
    public properties: PropertiesListRoom,
    public service: SalonesEsPrService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(
      router,
      route,
      service,
      Sesion.user().rol.tipo === 'ES'
        ? properties.get('route-programacion-horario-estudiante').value
        : properties.get('route-programacion-horario').value,
      null
    );
    this.displayedColumns = properties.get(
      'table-ver-salon-programacion-horario-estudiante-col'
    ).value;
    this.route.paramMap.subscribe((params) => {
      console.log('reciviendo parametro');
      console.log(      params.get('data').toString());
      this.routeWeb = params.get('data').toString() === 'V'
      ? this.properties.get('route-redirect-web-video').route
      : this.properties.get('route-redirect-web-presentacion').route;
      console.log(this.routeWeb);
    });
  }

  ngOnInit() {

  }
}
