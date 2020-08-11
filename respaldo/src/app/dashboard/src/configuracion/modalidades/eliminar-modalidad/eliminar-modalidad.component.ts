import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { PropertiesModalidad } from 'src/app/dashboard/properties/properties-modalidad';
import { ModalidadService } from 'src/app/dashboard/service/dashboard/modalidad.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-modalidad',
  templateUrl: './eliminar-modalidad.component.html',
  styleUrls: ['./eliminar-modalidad.component.css']
})
export class EliminarModalidadComponent  extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesModalidad,
    public snackBar: MatSnackBar,
    public service: ModalidadService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-modalidad').value );
    this.displayedColumns = properties.get('table-eliminar-modalidad-col').value;
    this.menuService.add$(properties.get('menu-modalidad').value);
  }

  ngOnInit() {

  }
}
