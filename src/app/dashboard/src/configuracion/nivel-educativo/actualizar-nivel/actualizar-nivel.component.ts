import { ActualizarBaseComponent } from './../../../../modelo/actualizar-base-component';
import { MenuService } from './../../../../service/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NivelEsucativoService } from './../../../../service/dashboard/nivel-esucativo.service';
import { PropertiesNivelEducativo } from './../../../../properties/properties-nivel-educativo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-nivel',
  templateUrl: './actualizar-nivel.component.html',
  styleUrls: ['./actualizar-nivel.component.css']
})
export class ActualizarNivelComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesNivelEducativo,
    public service: NivelEsucativoService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , service , properties.get('route-nivel-educativo').value , properties.get('r-a-nivel-educativo').route);
    this.displayedColumns = properties.get('table-actualizar-nivel-educativo-col').value;
    this.menuService.add$(properties.get('menu-nivel-educativo').value);
  }

  ngOnInit() {

  }
}
