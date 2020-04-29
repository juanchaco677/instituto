import { LineaMateria } from './../../../../../modelo/linea-materia';
import { Materia } from './../../../../../modelo/materia';
import { Util } from './../../../../../utils/util';
import { Validacion } from './../../../../../utils/validacion';
import { ActivatedRoute } from '@angular/router';
import { LineaMateriaService } from './../../../../../service/dashboard/linea-materia.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActualizarMateriasComponent } from 'src/app/dashboard/configuracion/materias/actualizar-materias/actualizar-materias.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-linea-materias',
  templateUrl: './linea-materias.component.html',
  styleUrls: ['./linea-materias.component.css']
})
export class LineaMateriasComponent implements OnInit {
  crearEscuelaUsuario;
  activar: boolean;
  lineaMateria: LineaMateria;
  materiaOrigen: Materia;
  materia: Materia;
  errors: [];
  actCrear = false;
  @ViewChild(ActualizarMateriasComponent) actualizarMateriasComponent: ActualizarMateriasComponent;
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public lineaMateriaService: LineaMateriaService,
    private route: ActivatedRoute
  ) {
    this.materiaOrigen = new Materia();
    this.materia = new Materia();
    this.lineaMateria = new LineaMateria();

    this.crearEscuelaUsuario = this.formBuilder.group({
      materiaOrigen: Validacion.getCampoLetras(true),
      materia: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.crearEscuelaUsuario.invalid) {
      return;
    }
    this.lineaMateria.materia_origen = this.materiaOrigen;
    this.lineaMateria.materia = this.materia;
    this.activar = true;
    this.lineaMateriaService.store({ linea_asginatura: this.lineaMateria }, 'linea-asignatura/store').subscribe(
      data => {
        if (data['success']) {

          Util.openSnackBar(this.snackBar, 'Exito, Creación de registro Linea Asignatura.', 1, 'bottom');
          if (!this.actCrear) {
            if (!Util.empty(this.lineaMateriaService.listPagination$)) {
              if (this.lineaMateriaService.size$() < 5) {
                this.lineaMateriaService.addElementList$(data['linea-asignatura']);
              } else {
                this.lineaMateriaService.listPagination$ = null;
              }
            }
            this.crearEscuelaUsuario.reset();
          }
        } else {
          Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
        }
        this.activar = false;
      }, error => {
        this.errors = error.error;
        Util.openSnackBar(this.snackBar, error.error.error, 3, 'top');
        this.activar = false;
      }
    );
  }

  openDialogMateriaOrigen(): void {
    const dialogRef = this.dialog.open(ActualizarMateriasComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      this.materiaOrigen = new Materia(
        element.id,
        element.nombre,
        element.credito,
        element.created,
        element.updated
      );
      dialogRef.close();
    });
  }

  openDialogMateria(): void {
    const dialogRef = this.dialog.open(ActualizarMateriasComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      this.materia = new Materia(
        element.id,
        element.nombre,
        element.credito,
        element.created_at,
        element.updated_at
      );
      dialogRef.close();
    });
  }

  getControls(key: string) {
    return this.crearEscuelaUsuario.controls[key];
  }
}
