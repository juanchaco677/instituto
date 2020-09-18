import { MenuService } from './../../../../service/menu.service';
import { AsigEstudianteAsigsService } from './../../../../service/dashboard/asig-estudiante-asigs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesAsigEstudianteAsigs } from './../../../../properties/properties-asig-estudiante-asigs';
import { EliminarBaseComponent } from './../../../../modelo/eliminar-base-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-asig-estudiante-asigs',
  templateUrl: './eliminar-asig-estudiante-asigs.component.html',
  styleUrls: ['./eliminar-asig-estudiante-asigs.component.css'],
})
export class EliminarAsigEstudianteAsigsComponent
  extends EliminarBaseComponent {
  constructor(
    public properties: PropertiesAsigEstudianteAsigs,
    public snackBar: MatSnackBar,
    public service: AsigEstudianteAsigsService,
    private menuService: MenuService
  ) {
    super(
      snackBar,
      service,
      properties.get('route-asig-estudiante-asigs').value
    );
    this.displayedColumns = properties.get(
      'table-eliminar-asig-estudiante-asigs-col'
    ).value;
    this.menuService.add$(properties.get('menu-asig-estudiante-asigs').value);
  }

}
