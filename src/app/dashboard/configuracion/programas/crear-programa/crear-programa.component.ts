import { Util } from './../../../../utils/util';
import { Validacion } from './../../../../utils/validacion';
import { ActivatedRoute } from '@angular/router';
import { ProgramaService } from './../../../../service/dashboard/programa.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Programa } from './../../../../modelo/programa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-programa',
  templateUrl: './crear-programa.component.html',
  styleUrls: ['./crear-programa.component.css']
})
export class CrearProgramaComponent implements OnInit {

  crear;
  programa: Programa;
  activar: boolean;
  errors: any;
  actCrear: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private programaService: ProgramaService,
    private route: ActivatedRoute
  ) {

    this.programa = new Programa();
    this.route.paramMap.subscribe(params => {
      this.programa.id = +params.get('id');
    });

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
    });

    if (!Util.emptyNaN(this.programa.id)) {
      this.actCrear = true;
      this.programa = this.programaService.buscarElementList$(this.programa);
    }

  }

  ngOnInit(): void {

  }

  getControls(key: string) {

    return this.crear.controls[key];
  }

  onSubmit() {

    if (this.crear.invalid) {
      return;
    }
    this.activar = true;
    this.programaService.store({ programa: this.programa }, 'programa/store').subscribe(
      data => {
        if (data['success']) {

          Util.openSnackBar(this.snackBar, 'Exito, Creación de programa.', 1, 'bottom');
          if (!this.actCrear) {
            if (!Util.empty(this.programaService.listPagination$)) {
              if (this.programaService.size$() < 5) {
                this.programaService.addElementList$(data['programa']);
              } else {
                this.programaService.listPagination$ = null;
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
        Util.openSnackBar(this.snackBar, 'Error, Almacenando la información del programa.', 3, 'top');
        this.activar = false;
      }
    );
  }
}
