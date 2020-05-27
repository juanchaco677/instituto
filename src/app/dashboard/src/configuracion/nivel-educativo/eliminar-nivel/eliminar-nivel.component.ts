import { MenuService } from './../../../../service/menu.service';
import { NivelEsucativoService } from './../../../../service/dashboard/nivel-esucativo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesNivelEducativo } from './../../../../properties/properties-nivel-educativo';
import { EliminarBaseComponent } from './../../../../modelo/eliminar-base-component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-nivel',
  templateUrl: './eliminar-nivel.component.html',
  styleUrls: ['./eliminar-nivel.component.css']
})
export class EliminarNivelComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesNivelEducativo,
    public snackBar: MatSnackBar,
    public service: NivelEsucativoService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-nivel-educativo').value );
    this.displayedColumns = properties.get('table-eliminar-nivel-educativo-col').value;
    this.menuService.add$(properties.get('menu-nivel-educativo').value);
  }

  ngOnInit() {

  }

}
