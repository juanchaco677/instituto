import { ProgramacionHorarioService } from '../../../../../../../dashboard/service/dashboard/programacion-horario.service';
import { PropertiesProgramacionHorario } from 'src/app/dashboard/properties/properties-programacion-horario';
import { MenuService } from '../../../../../../../dashboard/service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseRedireccionarComponent } from 'src/app/dashboard/modelo/actualizar-base-redireccionar-component';

@Component({
  selector: 'app-programacion-horario',
  templateUrl: './programacion-horario.component.html',
  styleUrls: ['./programacion-horario.component.css']
})
export class ProgramacionHorarioComponent extends ActualizarBaseRedireccionarComponent implements OnInit {

  constructor(
    public properties: PropertiesProgramacionHorario,
    public service: ProgramacionHorarioService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-programacion-horario').value , properties.get('route-redirect-web').route);
    this.displayedColumns = properties.get('table-actualizar-programacion-horario-col').value;
    this.menuService.add$(properties.get('menu-programacion-horario').value);
  }

  ngOnInit() {

  }
}
