import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { MenuService } from './../../../service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatriculaService } from './../../../service/dashboard/matricula.service';
import { PropertiesMatricula } from './../../../properties/properties-matricula';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-matricula',
  templateUrl: './actualizar-matricula.component.html',
  styleUrls: ['./actualizar-matricula.component.css'],
})
export class ActualizarMatriculaComponent
  extends ActualizarBaseComponent
  implements OnInit {
  constructor(
    public properties: PropertiesMatricula,
    public service: MatriculaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService
  ) {
    super(
      router,
      route,
      service,
      properties.get('route-matricula').value,
      properties.get('r-a-matricula').route
    );
    this.displayedColumns = properties.get(
      'table-actualizar-matricula-col'
    ).value;
    this.menuService.add$(properties.get('menu-matricula').value);
  }

  ngOnInit() {}
}
