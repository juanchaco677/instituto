import { MenuService } from './../../../../../service/menu.service';
import { EliminarBaseComponent } from './../../../../../modelo/eliminar-base-component';
import { LineaMateriaService } from './../../../../../service/dashboard/linea-materia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { PropertiesMateriaLinea } from 'src/app/properties/properties-materias-linea';

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
