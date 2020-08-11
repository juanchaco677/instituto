import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { PropertiesEscuelaPrograma } from 'src/app/dashboard/properties/properties-escuela-programa';
import { EscuelaProgramaService } from 'src/app/dashboard/service/dashboard/escuela-programa.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-escuela-programa',
  templateUrl: './eliminar-escuela-programa.component.html',
  styleUrls: ['./eliminar-escuela-programa.component.css']
})
export class EliminarEscuelaProgramaComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuelaPrograma,
    public snackBar: MatSnackBar,
    public service: EscuelaProgramaService,
    private menuService: MenuService,
    public route: ActivatedRoute,
  ) {
    super(snackBar, service , properties.get('route-escuela-programa').value, route );
    this.displayedColumns = properties.get('table-eliminar-escuela-programa-col').value;
    this.menuService.add$(properties.get('menu-escuela-programa').value);
  }

  ngOnInit() {

  }
}
