import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { PropertiesProgramacionHorario } from 'src/app/dashboard/properties/properties-programacion-horario';
import { ProgramacionHorarioService } from 'src/app/dashboard/service/dashboard/programacion-horario.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-programacion-horario',
  templateUrl: './actualizar-programacion-horario.component.html',
  styleUrls: ['./actualizar-programacion-horario.component.css']
})
export class ActualizarProgramacionHorarioComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesProgramacionHorario,
    public service: ProgramacionHorarioService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-programacion-horario').value , properties.get('r-a-programacion-horario').route);
    this.displayedColumns = properties.get('table-actualizar-programacion-horario-col').value;
    this.menuService.add$(properties.get('menu-programacion-horario').value);

  }

  ngOnInit() {

  }
}
