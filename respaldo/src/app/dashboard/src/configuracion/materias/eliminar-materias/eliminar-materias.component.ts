import { PropertiesMateria } from 'src/app/dashboard/properties/properties-materias';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { MateriaService } from 'src/app/dashboard/service/dashboard/materia.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
@Component({
  selector: 'app-eliminar-materias',
  templateUrl: './eliminar-materias.component.html',
  styleUrls: ['./eliminar-materias.component.css']
})
export class EliminarMateriasComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesMateria,
    public snackBar: MatSnackBar,
    public service: MateriaService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-materia').value );
    this.displayedColumns = properties.get('table-eliminar-materia-col').value;
    this.menuService.add$(properties.get('menu-materia').value);
  }

  ngOnInit() {

  }

}
