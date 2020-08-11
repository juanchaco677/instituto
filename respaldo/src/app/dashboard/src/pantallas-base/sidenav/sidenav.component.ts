import { OverlayContainer } from '@angular/cdk/overlay';
import { Configuracion } from '../../../modelo/configuracion';
import { Util } from '../../../../utils/util';
import { MenuService } from '../../../service/menu.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/dashboard/service/dashboard/configuracion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  menuOpcion: string;
  configuraciones: Configuracion[];
  confTitulo: Configuracion = new Configuracion('titulo');
  confLogo: Configuracion = new Configuracion('logo');
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({ length: 50 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(
    private configuracionService: ConfiguracionService,
    private snackBar: MatSnackBar,
    private menuService: MenuService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private overlay: OverlayContainer) {

    if (!this.overlay.getContainerElement().classList.contains('theme-dark')) {
      overlay.getContainerElement().classList.add('theme-dark');
      document.body.classList.add('theme-dark');
    }

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.consultarMenuOpcion();
    this.consultarDatos();
    this.addMenuOpcion('Noticias');
  }
  consultarDatos() {
    if (this.configuracionService.empty$()) {
      this.configuracionService.getAllConfiguration().subscribe(
        data => {
          if (data['success']) {
            this.configuraciones = data['configuraciones'];
            this.configuracionService.createConfiguracion$(this.configuraciones);
            this.configuracionService.getConfiguraciones$().subscribe(
              configuraciones => {
                configuraciones.forEach(element => {
                  if (element.key === this.confTitulo.key) {
                    this.confTitulo = element;
                  }

                  if (element.key === this.confLogo.key) {
                    this.confLogo = element;
                    this.confLogo.value = Util.getUrlLogo(this.confLogo);
                  }
                });
              }
            );
          } else {
            Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
          }

        }, error => {
          Util.openSnackBar(this.snackBar, 'Error, Consultando la configuración del nombre instituto.', 3, 'top');

        }
      );
    } else {
      this.configuracionService.getConfiguraciones$().subscribe(
        configuraciones => {
          configuraciones.forEach(element => {
            if (element.key === this.confTitulo.key) {
              this.confTitulo = element;
              return;
            }

            if (element.key === this.confLogo.key) {
              this.confLogo = element;
              this.confLogo.value = Util.getUrlLogo(this.confLogo);
              return;
            }
          });
        }
      );
    }
  }
  ngOnInit(): void {
    this.consultarMenuOpcion();
  }

  consultarMenuOpcion() {
    this.menuService.get$().subscribe(
      data => {
        this.menuOpcion = data;
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  addMenuOpcion(data: string) {
    this.menuService.add$(data);
  }
}
