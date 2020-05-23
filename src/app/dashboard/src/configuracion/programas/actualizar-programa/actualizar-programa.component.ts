
import { PropertiesPrograma } from 'src/app/dashboard/properties/properties-programa';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActualizarBaseComponent } from 'src/app/dashboard/modelo/actualizar-base-component';
import { ProgramaService } from 'src/app/dashboard/service/dashboard/programa.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-actualizar-programa',
  templateUrl: './actualizar-programa.component.html',
  styleUrls: ['./actualizar-programa.component.css']
})
export class ActualizarProgramaComponent extends ActualizarBaseComponent implements OnInit {

  constructor(
    public properties: PropertiesPrograma,
    public programaService: ProgramaService,
    public router: Router,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(router , route , programaService , properties.get('r-programa').value, properties.get('r-a-programa').route);

    this.displayedColumns = properties.get('t-a-programa-col').value;
    this.menuService.add$(properties.get('m-t-programa').value);

  }

  ngOnInit() {

  }
}
