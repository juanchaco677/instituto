import { HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Noticia } from 'src/app/dashboard/modelo/noticia';
import { FileMultimedia } from 'src/app/dashboard/modelo/filemultimedia';
import { Multimedia } from 'src/app/dashboard/modelo/multimedia';
import { PropertiesNoticia } from 'src/app/dashboard/properties/properties-noticia';
import { NoticiaService } from 'src/app/dashboard/service/dashboard/noticia.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';


@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent extends CrearBaseComponent implements OnInit {
  noticia: Noticia;
  fileMultimedias: FileMultimedia[] = [];
  dataForm: FormData;
  constructor(
    public properties: PropertiesNoticia,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: NoticiaService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {

    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-noticia').value);

    this.noticia = new Noticia(new Multimedia());

    this.noticia = !Util.empty(this.data) ? this.data : this.noticia;

    this.crear = this.formBuilder.group({
      titulo: Validacion.getCampo(true),
      descripcion: Validacion.getCampo(true),
    });
  }

  ngOnInit(): void {

  }
  onSubmit() {

    if (this.crear.invalid) {
      return;
    }
    this.activar = true;
    this.dataForm = new FormData();
    if (!Util.empty(this.fileMultimedias) && this.fileMultimedias.length > 0) {
      for (const file of this.fileMultimedias) {
        this.dataForm.append('files[]', file.data);
      }
    }
    this.dataForm.append('noticia', JSON.stringify(this.noticia).toString());

    this.service.store(this.dataForm).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (!Util.empty(this.fileMultimedias) && this.fileMultimedias.length > 0) {
              for (const file of this.fileMultimedias) {
                file.progress = Math.round(event.loaded * 100 / event.total);
              }
            }
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
    ).subscribe
      (data => {
        if (!Util.empty(data)) {
          this.fileMultimedias = [];
          if (!this.actCrear) {
            if (!Util.empty(this.service.listPagination$)) {
              if (this.service.size$() < 5) {
                this.service.addElementList$(data['data']);
              } else {
                this.service.listPagination$ = null;
              }
            }
            this.noticia = new Noticia();
            Util.openSnackBar(this.snackBar, 'Transaccion termino con éxito.', 1, 'top');
            this.crear.reset();

          } else {
            Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
          }
        }
        this.activar = false;
      }, error => {
        this.errors = error.error;
        Util.openSnackBar(this.snackBar, 'Error, Almacenando la información.', 3, 'top');
        this.activar = false;
      });
  }
  recive(fileMultimedias) {
    this.fileMultimedias = fileMultimedias;
  }
}
