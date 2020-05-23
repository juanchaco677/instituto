
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/dashboard/service/dashboard/sede.service';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { PropertiesSede } from 'src/app/dashboard/properties/properties-sede';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-sede',
  templateUrl: './actualizar-sede.component.html',
  styleUrls: ['./actualizar-sede.component.css']
})
export class ActualizarSedeComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesSede,
    public service: SedeService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router, route, service, properties.get('route-sede').value, properties.get('r-a-sede').route);

    this.displayedColumns = properties.get('table-actualizar-sede-col').value;
    this.menuService.add$(properties.get('menu-sede').value);

  }

  ngOnInit() {

  }
}
