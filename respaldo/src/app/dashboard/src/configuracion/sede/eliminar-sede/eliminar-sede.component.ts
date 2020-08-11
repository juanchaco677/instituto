import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SedeService } from 'src/app/dashboard/service/dashboard/sede.service';
import { PropertiesSede } from 'src/app/dashboard/properties/properties-sede';
import { MenuService } from 'src/app/dashboard/service/menu.service';
@Component({
  selector: 'app-eliminar-sede',
  templateUrl: './eliminar-sede.component.html',
  styleUrls: ['./eliminar-sede.component.css']
})
export class EliminarSedeComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesSede,
    public snackBar: MatSnackBar,
    public service: SedeService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-sede').value );
    this.displayedColumns = properties.get('table-eliminar-sede-col').value;
    this.menuService.add$(properties.get('menu-sede').value);
  }

  ngOnInit() {

  }
}
