import { ThemeService } from './../../../../theme.service';
import { MenuAulaService } from './../../../service/menu-aula.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plantilla-principal',
  templateUrl: './plantilla-principal.component.html',
  styleUrls: ['./plantilla-principal.component.css'],
})
export class PlantillaPrincipalComponent implements OnInit {
  constructor(
    private menuService: MenuAulaService,
    public themeService: ThemeService,
    private overlay: OverlayContainer
  ) {
    if (this.overlay.getContainerElement().classList.contains('theme-dark')) {
      themeService.add$(2);
    }
  }
  ngOnInit(): void {}
  addMenuOpcion(data: string) {
    this.menuService.add$(data);
  }
}
