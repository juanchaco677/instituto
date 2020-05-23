
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { PropertiesModalidad } from 'src/app/dashboard/properties/properties-modalidad';
import { ModalidadService } from 'src/app/dashboard/service/dashboard/modalidad.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-modalidad',
  templateUrl: './actualizar-modalidad.component.html',
  styleUrls: ['./actualizar-modalidad.component.css']
})
export class ActualizarModalidadComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesModalidad,
    public service: ModalidadService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-modalidad').value , properties.get('r-a-modalidad').route);
    this.displayedColumns = properties.get('table-actualizar-modalidad-col').value;
    this.menuService.add$(properties.get('menu-modalidad').value);

  }

  ngOnInit() {

  }
}
