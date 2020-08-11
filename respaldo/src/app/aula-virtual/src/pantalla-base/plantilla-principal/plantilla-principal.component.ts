import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from './../../../../utils/util';
import { Configuracion } from './../../../../dashboard/modelo/configuracion';
import { ConfiguracionService } from './../../../../dashboard/service/dashboard/configuracion.service';
import { MenuAulaService } from './../../../service/menu-aula.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-principal',
  templateUrl: './plantilla-principal.component.html',
  styleUrls: ['./plantilla-principal.component.css']
})
export class PlantillaPrincipalComponent implements OnInit {

  constructor(
    private overlay: OverlayContainer,
    private menuService: MenuAulaService,
  ) {
    if (!this.overlay.getContainerElement().classList.contains('theme-light')) {
      overlay.getContainerElement().classList.add('theme-light');
      document.body.classList.add('theme-light');
    }
  }
  ngOnInit(): void {
  }
  addMenuOpcion(data: string) {
    this.menuService.add$(data);
  }

}
