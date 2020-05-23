import { Component, OnInit } from '@angular/core';
import { EscuelaService } from 'src/app/dashboard/service/dashboard/escuela.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { PropertiesEscuela } from 'src/app/dashboard/properties/properties-escuelas';
import { MenuService } from 'src/app/dashboard/service/menu.service';
@Component({
  selector: 'app-eliminar-escuelas',
  templateUrl: './eliminar-escuelas.component.html',
  styleUrls: ['./eliminar-escuelas.component.css']
})
export class EliminarEscuelasComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuela,
    public snackBar: MatSnackBar,
    public service: EscuelaService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-escuela').value );
    this.displayedColumns = properties.get('table-eliminar-escuela-col').value;
    this.menuService.add$(properties.get('menu-escuela').value);
  }

  ngOnInit() {

  }
}
