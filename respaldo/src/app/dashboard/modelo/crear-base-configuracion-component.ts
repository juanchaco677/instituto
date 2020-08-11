import { ConfiguracionService } from './../service/dashboard/configuracion.service';
import { Configuracion } from './configuracion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';

export class CrearBaseConfiguracionComponent {
  configuracion: Configuracion = new Configuracion('titulo');
  configuraciones: Configuracion[];
  configuracionForm;
  activar: boolean;
  errors: any[];
  constructor(
    public configuracionService: ConfiguracionService,
    public snackBar: MatSnackBar,
    public key: string,
  ) {
    this.configuracion = new Configuracion(key);
    if (this.configuracionService.empty$()) {
      this.consultarDatos();
    } else {
      this.consultarDatosMemoria();
    }
  }

  consultarDatos() {

    this.configuracionService.getAllConfiguration().subscribe(
      data => {
        if (data['success']) {
          this.configuraciones = data['configuraciones'];
          this.configuracionService.createConfiguracion$(this.configuraciones);
          this.configuracionService.getConfiguraciones$().subscribe(
            configuraciones => {
              configuraciones.forEach(element => {
                if (element.key === this.configuracion.key) {
                  this.configuracion = element;
                  return;
                }
              });
            }
          );
        } else {
          Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
        }
        this.activar = false;

      }, error => {
        this.errors = error.error;
        Util.openSnackBar(this.snackBar, 'Error, Consultando la configuración del nombre instituto.', 3, 'top');
        this.activar = false;
      }
    );

  }

  consultarDatosMemoria() {
    this.configuracionService.getConfiguraciones$().subscribe(
      configuraciones => {
        configuraciones.forEach(element => {
          if (element.key === this.configuracion.key) {
            this.configuracion = element;
            return;
          }
        });
      }
    );
  }


  onSubmit() {
    if (this.configuracionForm.invalid) {
      return;
    }
    this.activar = true;
    this.configuracionService.store({ configuracion: this.configuracion }, 'configuracion/store').subscribe(
      data => {
        if (data['success']) {
          Util.openSnackBar(this.snackBar, 'Exito, configuración guardada.', 1, 'bottom');
          this.configuraciones = data['configuraciones'];
          this.configuracionService.deleteConfiguracion$(this.configuracion);
          this.configuracionService.addConfiguracion$(this.configuracion);
        } else {
          Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
        }
        this.activar = false;

      }, error => {
        this.errors = error.error;
        Util.openSnackBar(this.snackBar, 'Error, Almacenando la configuración.', 3, 'top');
        this.activar = false;
      }
    );
  }

  getControls(key: string) {
    return this.configuracionForm.controls[key];
  }
}
