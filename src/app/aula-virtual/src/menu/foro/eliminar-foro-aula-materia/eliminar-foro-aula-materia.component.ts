import { Sesion } from './../../../../../utils/sesion';
import { MenuService } from './../../../../../dashboard/service/menu.service';
import { ForoAulaMateriaService } from './../../../../service/foro-aula-materia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesForoAualaMateria } from './../../../../properties/properties-foro-aula-materia';
import { EliminarBaseComponent } from './../../../../../dashboard/modelo/eliminar-base-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-foro-aula-materia',
  templateUrl: './eliminar-foro-aula-materia.component.html',
  styleUrls: ['./eliminar-foro-aula-materia.component.css'],
})
export class EliminarForoAulaMateriaComponent
  extends EliminarBaseComponent
  implements OnInit {
  constructor(
    public properties: PropertiesForoAualaMateria,
    public snackBar: MatSnackBar,
    public service: ForoAulaMateriaService,
    private menuService: MenuService
  ) {
    super(
      snackBar,
      service,
      properties.get('route-foro-aula-materia').value,
      null,
      true,
      Sesion.userAulaChat()
    );
    this.displayedColumns = properties.get(
      'table-eliminar-foro-aula-materia-col'
    ).value;
    this.menuService.add$(properties.get('menu-foro-aula-materia').value);
  }

  ngOnInit() {}
}
