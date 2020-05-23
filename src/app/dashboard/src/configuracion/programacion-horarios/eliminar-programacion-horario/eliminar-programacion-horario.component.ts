import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { PropertiesProgramacionHorario } from 'src/app/dashboard/properties/properties-programacion-horario';
import { ProgramacionHorarioService } from 'src/app/dashboard/service/dashboard/programacion-horario.service';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-programacion-horario',
  templateUrl: './eliminar-programacion-horario.component.html',
  styleUrls: ['./eliminar-programacion-horario.component.css']
})
export class EliminarProgramacionHorarioComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesProgramacionHorario,
    public snackBar: MatSnackBar,
    public service: ProgramacionHorarioService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-programacion-horario').value );
    this.displayedColumns = properties.get('table-eliminar-programacion-horario-col').value;
    this.menuService.add$(properties.get('menu-programacion-horario').value);
  }

  ngOnInit() {

  }

}
