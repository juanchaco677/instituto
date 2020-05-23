import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesAsigProfeAsigs } from 'src/app/dashboard/properties/properties-asig-profe-asigs';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { AsigProfeAsigsService } from 'src/app/dashboard/service/dashboard/asig-profe-asigs.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-asig-profe-asigs',
  templateUrl: './eliminar-asig-profe-asigs.component.html',
  styleUrls: ['./eliminar-asig-profe-asigs.component.css']
})
export class EliminarAsigProfeAsigsComponent extends EliminarBaseComponent implements OnInit {
  constructor(
    public properties: PropertiesAsigProfeAsigs,
    public snackBar: MatSnackBar,
    public service: AsigProfeAsigsService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-asig-profe-asigs').value );
    this.displayedColumns = properties.get('table-eliminar-asig-profe-asigs-col').value;
    this.menuService.add$(properties.get('menu-asig-profe-asigs').value);
  }

  ngOnInit() {

  }

}
