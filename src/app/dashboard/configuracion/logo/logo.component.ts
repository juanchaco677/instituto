import { HttpEventType } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfiguracionService } from 'src/app/service/dashboard/configuracion.service';
import { Util } from './../../../utils/util';
import { Configuracion } from './../../../modelo/configuracion';
import { FileUpload } from './../../../fileupload';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  configuracion: Configuracion = new Configuracion('logo');
  configuraciones: Configuracion[];
  activar = false;
  logo;
  errors: string[];
  actCrear = false;
  dataForm: FormData;
  public fileUpload: FileUpload;
  constructor(
    private configuracionService: ConfiguracionService,
    private snackBar: MatSnackBar,
  ) {

    this.consultarDatos();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.getFile() != null && this.getFile().file != null) {
      this.dataForm = new FormData();
      this.dataForm.append('file', this.getFile().file.data);
      this.dataForm.append('configuracion', JSON.stringify(new Configuracion('logo')).toString());
      this.dataForm.append('img', '1');
      this.configuracionService.storeLogo(this.dataForm)
        .pipe(
          map(event => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                if (this.getFile() != null && this.getFile().file != null) {
                  this.getFile().file.progress = Math.round(event.loaded * 100 / event.total);
                }
                break;
              case HttpEventType.Response:
                return event;
            }
          }),
        )
        .subscribe(
          data => {
            if (!Util.empty(data)) {
              this.configuracion = data.body['configuracion'];
              this.configuracionService.deleteConfiguracion$(this.configuracion);
              this.configuracionService.addConfiguracion$(this.configuracion);
              this.configuracionService.getConfiguraciones$().subscribe(
                configuraciones => {
                  this.configuraciones = configuraciones;
                  configuraciones.forEach(element => {
                    if (element.key === this.configuracion.key) {
                      this.configuracion = element;
                      this.configuracion.value = Util.getUrlLogo(this.configuracion);
                      return;
                    }
                  });
                }
              );
              this.fileUpload = null;
              Util.openSnackBar(this.snackBar, 'Exito, Se guardo el logo.', 1, 'bottom');
              this.activar = false;
            }
          }, error => {
            this.errors = error.error;
            Util.openSnackBar(this.snackBar, 'Error, Consultando la configuración del nombre instituto.', 3, 'top');
            this.activar = false;
          });
    } else {
      return;
    }
  }

  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  recive(fileUpload) {
    this.fileUpload = fileUpload;
    this.actCrear = true;
  }

  getFile() {
    if (!Util.empty(this.fileUpload)
      && !Util.empty(this.fileUpload.file)) {
        return this.fileUpload;
    }
    return null;
  }

  consultarDatos() {
    if (this.configuracionService.empty$()) {

      console.log("configuracion 1");
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
                    this.configuracion.value = Util.getUrlLogo(this.configuracion);
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
      console.log("configuracion 2");
      this.configuracionService.getConfiguraciones$().subscribe(
        configuraciones => {
          configuraciones.forEach(element => {
            if (element.key === this.configuracion.key) {
              this.configuracion = element;
              this.configuracion.value = Util.getUrlLogo(this.configuracion);
              return;
            }
          });
        }
      );
    }
  }
}
