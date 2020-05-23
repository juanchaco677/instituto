import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { PropertiesEscuelaPrograma } from 'src/app/dashboard/properties/properties-escuela-programa';
import { EscuelaProgramaService } from 'src/app/dashboard/service/dashboard/escuela-programa.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-escuela-programa',
  templateUrl: './actualizar-escuela-programa.component.html',
  styleUrls: ['./actualizar-escuela-programa.component.css']
})
export class ActualizarEscuelaProgramaComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesEscuelaPrograma,
    public service: EscuelaProgramaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-escuela-programa').value, properties.get('r-a-escuela-programa').route);

    this.displayedColumns = properties.get('table-actualizar-escuela-programa-col').value;
    this.menuService.add$(properties.get('menu-escuela-programa').value);

  }

  ngOnInit() {

  }
}
