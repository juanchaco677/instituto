import { AnySort } from 'src/app/sort/anySort';
import { Sesion } from './../../../../../utils/sesion';
import { PaginationMaterial } from './../../../../../paginationmaterial';
import { Util } from './../../../../../utils/util';
import { FormBuilder } from '@angular/forms';
import { Validacion } from './../../../../../utils/validacion';
import { MenuService } from './../../../../../dashboard/service/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ForoComentarioService } from './../../../../service/foro-comentario.service';
import { PropertiesForoComentarios } from './../../../../properties/properties-foro-comentarios';
import { ForoAulaComentario } from './../../../../model/foro-aula-comentario';
import { CrearBaseComponent } from './../../../../../dashboard/modelo/crear-base-component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { AnyPagination } from 'src/app/dashboard/modelo/anyPagination';
@Component({
  selector: 'app-crear-foro-aula-comentario',
  templateUrl: './crear-foro-aula-comentario.component.html',
  styleUrls: ['./crear-foro-aula-comentario.component.css'],
})
export class CrearForoAulaComentarioComponent
  extends CrearBaseComponent
  implements OnInit {
  @Input() foroAulaComentario: ForoAulaComentario;

  constructor(
    private formBuilder: FormBuilder,
    public properties: PropertiesForoComentarios,
    public service: ForoComentarioService,
    public route: ActivatedRoute,
    public location: Location,
    public snackBar: MatSnackBar,
    private menuService: MenuService
  ) {
    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-foro-aula-comentario').value);

    this.foroAulaComentario = new ForoAulaComentario();

    this.crear = this.formBuilder.group({
      comentario: Validacion.getCampo(true),
    });
    this.actCrear = false;
  }
  ngOnInit(): void {}

  onSubmit() {
    this.onSubmit$(
      this.properties.get('route-foro-aula-comentario').value,
      this.foroAulaComentario
    );
  }

  onSubmit$(key: any, dataModel: any) {
    if (this.crear.invalid) {
      return;
    }
    this.out.emit(true);
    this.activar = true;
    this.service.store({ data: dataModel }, key + '/store').subscribe(
      (data) => {
        if (data['success']) {
          Util.openSnackBar(
            this.snackBar,
            'Exito, Creación de ' + key + '.',
            1,
            'bottom'
          );
          if (!this.actCrear) {
            console.log('1');
            console.log(this.service.listPagination$);
            if (Util.empty(this.service.listPagination$)) {
              const paginationMaterial = new PaginationMaterial(
                1,
                5,
                [5, 10, 25, 100],
                1 - 1
              );
              this.service.createList$(
                new AnyPagination([], paginationMaterial)
              );
            }
            if (!Util.empty(this.service.listPagination$)) {
              console.log('2');

              console.log('3');
              data['data']['usuario'] = Sesion.user();
              console.log(data);
              console.log('---------------------');
              const paginationMaterial = new PaginationMaterial(
                this.service.listPagination$.getValue().pagination.length + 1,
                this.service.listPagination$.getValue().pagination.pageSize,
                [5, 10, 25, 100],
                this.service.listPagination$.getValue().pagination.page
              );
              const anyPagination = new AnyPagination(
                this.service.listPagination$.getValue().array,
                paginationMaterial
              );

              anyPagination.array = data['data'];

              this.service.listPagination$.next(anyPagination);
              console.log(this.service.listPagination$);
            }
            this.crear.reset();
          }
        } else {
          Util.openSnackBar(
            this.snackBar,
            'Advertencia, Contacte con el administrador del sitio.',
            2,
            'bottom'
          );
        }
        this.activar = false;
      },
      (error) => {
        this.errors = error.error;
        Util.openSnackBar(
          this.snackBar,
          'Error, Almacenando la información.',
          3,
          'top'
        );
        this.activar = false;
      }
    );
  }
}
