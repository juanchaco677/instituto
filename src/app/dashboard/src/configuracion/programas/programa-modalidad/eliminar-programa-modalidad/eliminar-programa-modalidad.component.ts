import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { PropertiesProgramaModalidad } from 'src/app/dashboard/properties/properties-programa-modalidad';
import { ProgramaModalidadService } from 'src/app/dashboard/service/dashboard/programa-modalidad.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-programa-modalidad',
  templateUrl: './eliminar-programa-modalidad.component.html',
  styleUrls: ['./eliminar-programa-modalidad.component.css']
})
export class EliminarProgramaModalidadComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesProgramaModalidad,
    public snackBar: MatSnackBar,
    public service: ProgramaModalidadService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-programa-modalidad').value );
    this.displayedColumns = properties.get('table-eliminar-programa-modalidad-col').value;
    this.menuService.add$(properties.get('menu-programa-modalidad').value);
  }

  ngOnInit() {

  }

}
