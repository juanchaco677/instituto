import { PropertiesPrograma } from 'src/app/dashboard/properties/properties-programa';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { ProgramaService } from 'src/app/dashboard/service/dashboard/programa.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-programa',
  templateUrl: './eliminar-programa.component.html',
  styleUrls: ['./eliminar-programa.component.css']
})
export class EliminarProgramaComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesPrograma,
    public snackBar: MatSnackBar,
    public service: ProgramaService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('r-programa').value );
    this.displayedColumns = properties.get('t-e-programa-col').value;
    this.menuService.add$(properties.get('m-t-programa').value);
  }

  ngOnInit() {

  }
}
