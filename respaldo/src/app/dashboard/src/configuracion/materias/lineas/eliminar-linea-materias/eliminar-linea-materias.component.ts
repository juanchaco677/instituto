import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { PropertiesMateriaLinea } from 'src/app/dashboard/properties/properties-materias-linea';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { LineaMateriaService } from 'src/app/dashboard/service/dashboard/linea-materia.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-linea-materias',
  templateUrl: './eliminar-linea-materias.component.html',
  styleUrls: ['./eliminar-linea-materias.component.css']
})
export class EliminarLineaMateriasComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesMateriaLinea,
    public snackBar: MatSnackBar,
    public service: LineaMateriaService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-materia-linea').value );
    this.displayedColumns = properties.get('table-eliminar-col').value;
    this.menuService.add$(properties.get('menu-titulo-materia-linea').value);
  }

  ngOnInit() {

  }

}
