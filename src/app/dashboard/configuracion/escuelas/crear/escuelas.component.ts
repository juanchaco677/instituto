import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validacion } from 'src/app/utils/validacion';
import { Escuela } from 'src/app/modelo/escuela';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarSedeComponent } from '../../sede/actualizar-sede/actualizar-sede.component';
import { Sede } from 'src/app/modelo/sede';
import { EscuelaService } from 'src/app/service/dashboard/escuela.service';
import { Util } from 'src/app/utils/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.css']
})
export class EscuelasComponent implements OnInit {
  crearEscuela;
  activar: boolean;
  escuela: Escuela;
  sede: Sede;
  errors: [];
  actCrear: boolean;
  @ViewChild(ActualizarSedeComponent) actualizarSedeComponent: ActualizarSedeComponent;
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public escuelaService: EscuelaService,
    private route: ActivatedRoute
  ) {

    this.escuela = new Escuela();
    this.sede = new Sede();

    this.route.paramMap.subscribe(params => {
      this.escuela.id = +params.get('id');
    });

    this.crearEscuela = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
      sede: Validacion.getCampoLetras(true),
    });

    if (!Util.emptyNaN(this.escuela.id)) {
      this.actCrear = true;
      this.escuela = this.escuelaService.buscarElementList$(this.escuela);
      this.sede = this.escuela.sede;
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.crearEscuela.invalid) {
      return;
    }
    this.escuela.sede = this.sede;
    this.activar = true;
    this.escuelaService.store({ escuela: this.escuela }, 'escuela/store').subscribe(
      data => {
        if (data['success']) {

          Util.openSnackBar(this.snackBar, 'Exito, Creación de escuela.', 1, 'bottom');
          if (!this.actCrear) {
            if (!Util.empty(this.escuelaService.listPagination$)) {
              if (this.escuelaService.size$() < 5) {
                this.escuelaService.addElementList$(data['escuela']);
              } else {
                this.escuelaService.listPagination$ = null;
              }
            }
            this.crearEscuela.reset();
          }
        } else {
          Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
        }
        this.activar = false;
      }, error => {
        this.errors = error.error;
        Util.openSnackBar(this.snackBar, 'Error, Almacenando la información de la sede.', 3, 'top');
        this.activar = false;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ActualizarSedeComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      this.sede = new Sede(
        element.id,
        element.nombre,
        element.localizacion,
        element.created_at,
        element.updated_at
      );
      dialogRef.close();
    });

  }

  getControls(key: string) {

    return this.crearEscuela.controls[key];
  }
}
