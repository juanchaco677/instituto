import { PropertiesSalones } from './../../../../properties/properties-salones';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { SalonService } from 'src/app/dashboard/service/dashboard/salon.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-salon',
  templateUrl: './actualizar-salon.component.html',
  styleUrls: ['./actualizar-salon.component.css']
})
export class ActualizarSalonComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesSalones,
    public service: SalonService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-salon').value , properties.get('r-a-salon').route);
    this.displayedColumns = properties.get('table-actualizar-salon-col').value;
    this.menuService.add$(properties.get('menu-salon').value);

  }

  ngOnInit() {

  }
}
