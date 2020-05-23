import { MatSnackBar } from '@angular/material/snack-bar';
import { OperacionBD } from './operacion-bd';
import { ActivatedRoute } from '@angular/router';
import { Util } from 'src/app/utils/util';
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
    public snackBar: MatSnackBar,
  ){
    this.route.paramMap.subscribe(params => {
      const idData = +params.get('id');
      this.tipo = !Util.empty(params.get('tipo')) ? params.get('tipo').toUpperCase() : null;

      if (!Util.emptyNaN(idData)) {
        this.actCrear = true;
        this.data = this.service.buscarElementList$({ id: idData});
      }
    });
  }



  getControls(key: string) {
    return this.crear.controls[key];
  }

  onSubmit$(key: any , dataModel: any) {

    if (this.crear.invalid) {
      return;
    }
    this.activar = true;
    this.service.store({ data: dataModel }, key + '/store').subscribe(
      data => {
        if (data['success']) {

          Util.openSnackBar(this.snackBar, 'Exito, Creación de ' + key + '.', 1, 'bottom');
          if (!this.actCrear) {
            if (!Util.empty(this.service.listPagination$)) {
              if (this.service.size$() < 5) {
                this.service.addElementList$(data['data']);
              } else {
                this.service.listPagination$ = null;
              }
            }
            this.crear.reset();
          }
        } else {
          Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
        }
        this.activar = false;

      }, error => {
        this.errors = error.error;
        Util.openSnackBar(this.snackBar, 'Error, Almacenando la información.', 3, 'top');
        this.activar = false;
      }
    );
  }
}
