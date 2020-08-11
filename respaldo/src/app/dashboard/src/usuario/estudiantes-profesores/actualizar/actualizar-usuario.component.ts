import { ActualizarBaseComponent } from '../../../../modelo/actualizar-base-component';
import { MenuService } from '../../../../service/menu.service';
import { PropertiesUsuario } from '../../../../properties/properties-usuario';
import { Component, OnInit} from '@angular/core';
import { UsuarioService } from '../../../../service/dashboard/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css'],
  providers: [ UsuarioService ]
})
export class ActualizarUsuarioComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesUsuario,
    public service: UsuarioService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService
  ) {
    super(router, route, service, properties.get('route-usuario').value, properties.get('r-a-usuario').route );

    this.displayedColumns = properties.get('table-actualizar-usuario-col').value;

    this.menuService.add$(this.tipo === 'PR' ? properties.get('menu-profesor').value : properties.get('menu-estudiante').value);

  }

  ngOnInit() {

  }
}
