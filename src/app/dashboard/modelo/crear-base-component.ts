import { PaginationMaterial } from './../../paginationmaterial';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperacionBD } from './operacion-bd';
import { ActivatedRoute } from '@angular/router';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from './anyPagination';
export class CrearBaseComponent {
  crear;
  activar: boolean;
  errors: any;
  actCrear: boolean;
  data: any;
  tipo: string;
  constructor(
    public route: ActivatedRoute,
    public service: OperacionBD,
    public snackBar: MatSnackBar
  ) {
    this.route.paramMap.subscribe((params) => {
      const idData = +params.get('id');
      this.tipo = !Util.empty(params.get('tipo'))
        ? params.get('tipo').toUpperCase()
        : null;

      if (!Util.emptyNaN(idData)) {
        this.actCrear = true;
        this.data = this.service.buscarElementList$({ id: idData });
      }
    });
  }

  getControls(key: string) {
    return this.crear.controls[key];
  }

  onSubmit$(key: any, dataModel: any) {
    if (this.crear.invalid) {
      return;
    }
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
              if (this.service.size$() < 5) {
                console.log('3');
                this.service.addElementList$(data['data']);
                console.log(this.service.listPagination$);
              } else {
                console.log('4');
                this.service.listPagination$ = null;
              }
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
