import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validacion } from 'src/app/utils/validacion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
import { ActivatedRoute } from '@angular/router';
import { Materia } from 'src/app/modelo/materia';
import { MateriaService } from 'src/app/service/dashboard/materia.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  crearMateria: FormGroup;
  materia: Materia;
  activar: boolean;
  errors: any;
  actCrear: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private materiaService: MateriaService,
    private route: ActivatedRoute
  ) {

    this.materia = new Materia();
    this.route.paramMap.subscribe(params => {
      this.materia.id = +params.get('id');
    });

    this.crearMateria = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
      credito: Validacion.getCampoNumero(true, 1 , 2),
    });
    if (!Util.emptyNaN(this.materia.id)) {
      this.actCrear = true;
      this.materia = this.materiaService.buscarElementList$(this.materia);
    }

  }

  ngOnInit(): void {

  }



  getControls(key: string) {

    return this.crearMateria.controls[key];
  }

  onSubmit() {

    if (this.crearMateria.invalid) {
      return;
    }

    this.activar = true;
    this.materiaService.store({ materia: this.materia }, 'materia/store').subscribe(
      data => {
        if (data['success']) {

          Util.openSnackBar(this.snackBar, 'Exito, Creación de asignatura.', 1, 'bottom');
          if (!this.actCrear) {
            if (!Util.empty(this.materiaService.listPagination$)) {
              if (this.materiaService.size$() < 5) {
                this.materiaService.addElementList$(data['materia']);
              } else {
                this.materiaService.listPagination$ = null;
              }
            }
            this.crearMateria.reset();
          }
        } else {
          Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
        }
        this.activar = false;

      }, error => {
        this.errors = error.error;
        Util.openSnackBar(this.snackBar, 'Error, Almacenando la información de la asignatura.', 3, 'top');
        this.activar = false;
      }
    );
  }
}
