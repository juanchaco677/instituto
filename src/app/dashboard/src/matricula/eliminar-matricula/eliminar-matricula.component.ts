import { MenuService } from './../../../service/menu.service';
import { MatriculaService } from './../../../service/dashboard/matricula.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesMatricula } from './../../../properties/properties-matricula';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-matricula',
  templateUrl: './eliminar-matricula.component.html',
  styleUrls: ['./eliminar-matricula.component.css']
})
export class EliminarMatriculaComponent extends EliminarBaseComponent
implements OnInit {
constructor(
  public properties: PropertiesMatricula,
  public snackBar: MatSnackBar,
  public service: MatriculaService,
  private menuService: MenuService
) {
  super(
    snackBar,
    service,
    properties.get('route-matricula').value
  );
  this.displayedColumns = properties.get(
    'table-eliminar-matricula-col'
  ).value;
  this.menuService.add$(properties.get('menu-matricula').value);
}

ngOnInit() {}
}
