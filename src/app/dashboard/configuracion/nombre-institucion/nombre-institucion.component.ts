import { Component, OnInit } from '@angular/core';
import { Configuracion } from 'src/app/modelo/configuracion';
import { FormBuilder } from '@angular/forms';
import { Validacion } from 'src/app/utils/validacion';
import { ConfiguracionService } from 'src/app/service/dashboard/configuracion.service';
import { Util } from 'src/app/utils/util';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-nombre-institucion',
  templateUrl: './nombre-institucion.component.html',
  styleUrls: ['./nombre-institucion.component.css']
})
export class NombreInstitucionComponent implements OnInit {
  configuracion: Configuracion = new Configuracion('titulo');
  configuraciones: Configuracion[];
  configuracionForm;
  activar: boolean;
  errors: any[];
  constructor(
    private formBuilder: FormBuilder,
    private configuracionService: ConfiguracionService,
    private snackBar: MatSnackBar,
  ) {

    this.configuracionForm = this.formBuilder.group({
      value: Validacion.getCampoLetras(true),
    });

    this.consultarDatos();
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
    } else {
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
  }

  ngOnInit(): void {
    // this.consultarDatos();
  }

  onSubmit() {
    if (this.configuracionForm.invalid) {
      return;
    }
    this.activar = true;
    this.configuracionService.store({ configuracion: this.configuracion },'configuracion/store').subscribe(
      data => {
        if (data['success']) {
          Util.openSnackBar(this.snackBar, 'Exito, configuración guardada.', 1, 'bottom');
          this.configuraciones = data['configuraciones'];
          this.configuracionService.deleteConfiguracion$(this.configuracion);
          this.configuracionService.addConfiguracion$(this.configuracion);
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
        Util.openSnackBar(this.snackBar, 'Error, Almacenando la configuración.', 3, 'top');
        this.activar = false;
      }
    );
  }

  getControls(key: string) {
    return this.configuracionForm.controls[key];
  }

}
