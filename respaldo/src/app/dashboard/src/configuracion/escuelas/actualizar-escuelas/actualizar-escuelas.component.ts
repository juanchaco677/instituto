
import { Component, OnInit } from '@angular/core';
import { EscuelaService } from 'src/app/dashboard/service/dashboard/escuela.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { PropertiesEscuela } from 'src/app/dashboard/properties/properties-escuelas';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-escuelas',
  templateUrl: './actualizar-escuelas.component.html',
  styleUrls: ['./actualizar-escuelas.component.css']
})
export class ActualizarEscuelasComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuela,
    public service: EscuelaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router, route, service, properties.get('route-escuela').value, properties.get('r-a-escuela').route);
    this.displayedColumns = properties.get('table-actualizar-escuela-col').value;
    this.menuService.add$(properties.get('menu-escuela').value);

  }

  ngOnInit() {

  }
}
