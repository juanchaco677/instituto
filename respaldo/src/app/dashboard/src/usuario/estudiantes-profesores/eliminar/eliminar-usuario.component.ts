import { MenuService } from '../../../../service/menu.service';
import { PropertiesUsuario } from '../../../../properties/properties-usuario';
import { EliminarBaseComponent } from '../../../../modelo/eliminar-base-component';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/dashboard/service/dashboard/usuario.service';
@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css'],
  providers: [UsuarioService]
})
export class EliminarUsuarioComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesUsuario,
    public snackBar: MatSnackBar,
    public service: UsuarioService,
    private menuService: MenuService,
    public route: ActivatedRoute,
  ) {

    super(snackBar, service, properties.get('route-usuario').value, route);

    this.displayedColumns = properties.get('table-eliminar-usuario-col').value;

    this.menuService.add$(this.tipo === 'PR' ? properties.get('menu-profesor').value : properties.get('menu-estudiante').value);
  }

  ngOnInit() {

  }
}

