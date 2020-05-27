import { PropertiesSalones } from './../../../../properties/properties-salones';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { SalonService } from 'src/app/dashboard/service/dashboard/salon.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-salon',
  templateUrl: './eliminar-salon.component.html',
  styleUrls: ['./eliminar-salon.component.css']
})
export class EliminarSalonComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesSalones,
    public snackBar: MatSnackBar,
    public service: SalonService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-salon').value );
    this.displayedColumns = properties.get('table-eliminar-salon-col').value;
    this.menuService.add$(properties.get('menu-salon').value);
  }

  ngOnInit() {

  }

}
