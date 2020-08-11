import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EliminarBaseComponent } from 'src/app/dashboard/modelo/eliminar-base-component';
import { PropertiesNoticia } from 'src/app/dashboard/properties/properties-noticia';
import { NoticiaService } from 'src/app/dashboard/service/dashboard/noticia.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-eliminar-noticia',
  templateUrl: './eliminar-noticia.component.html',
  styleUrls: ['./eliminar-noticia.component.css']
})
export class EliminarNoticiaComponent extends EliminarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesNoticia,
    public snackBar: MatSnackBar,
    public service: NoticiaService,
    private menuService: MenuService,
  ) {
    super(snackBar, service , properties.get('route-noticia').value );
    this.displayedColumns = properties.get('table-eliminar-noticia-col').value;
    this.menuService.add$(properties.get('menu-noticia').value);
  }

  ngOnInit() {

  }
}
