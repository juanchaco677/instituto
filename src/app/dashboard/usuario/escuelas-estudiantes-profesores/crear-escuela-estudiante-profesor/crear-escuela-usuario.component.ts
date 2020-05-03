import { EscuelaUsuario } from 'src/app/modelo/escuela-usuario';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActualizarEscuelasComponent } from 'src/app/dashboard/configuracion/escuelas/actualizar-escuelas/actualizar-escuelas.component';

import { Escuela } from 'src/app/modelo/escuela';
import { Usuario } from 'src/app/modelo/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EscuelaUsuarioService } from 'src/app/service/dashboard/escuela-usuario.service';
import { Validacion } from 'src/app/utils/validacion';
import { ActualizarUsuarioComponent } from '../../estudiantes-profesores/actualizar/actualizar-usuario.component';
import { Util } from 'src/app/utils/util';
@Component({
  selector: 'app-crear-escuela-usuario',
  templateUrl: './crear-escuela-usuario.component.html',
  styleUrls: ['./crear-escuela-usuario.component.css']
})
export class CrearEscuelaUsuarioComponent implements OnInit {
  crearEscuelaUsuario;
  activar: boolean;
  escuelaUsuario: EscuelaUsuario;
  escuela: Escuela;
  usuario: Usuario;
  errors: [];
  actCrear: boolean;
  @ViewChild(ActualizarEscuelasComponent) actualizarEscuelasComponent: ActualizarEscuelasComponent;
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public escuelaUsuarioService: EscuelaUsuarioService,
    private route: ActivatedRoute
  ) {

    this.escuela = new Escuela();
    this.usuario = new Usuario();
    this.escuelaUsuario = new EscuelaUsuario();

    this.route.paramMap.subscribe(params => {
      this.usuario.tipo = params.get('tipo').toUpperCase();
      this.usuario.id = +params.get('id-usuario');
      this.escuela.id = +params.get('id-escuela');
    });

    this.crearEscuelaUsuario = this.formBuilder.group({
      escuela: Validacion.getCampoLetras(true),
      usuario: Validacion.getCampoLetras(true),
    });

    if (!Util.emptyNaN(this.escuela.id)) {
      this.actCrear = true;
      this.escuelaUsuario = this.escuelaUsuarioService.buscarElementList$({escuela : this.escuela , usuario: this.usuario});
      this.escuela = this.escuelaUsuario.escuela;
      this.usuario = this.escuelaUsuario.usuario;
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.crearEscuelaUsuario.invalid) {
      return;
    }
    this.escuelaUsuario.escuela = this.escuela;
    this.escuelaUsuario.usuario = this.usuario;

    this.activar = true;
    this.escuelaUsuarioService.store({ escuela_usuario: this.escuelaUsuario }, 'escuela-usuario/store').subscribe(
      data => {
        if (data['success']) {

          Util.openSnackBar(this.snackBar, 'Exito, Creación de registro Usuario Escuela.', 1, 'bottom');
          if (!this.actCrear) {
            if (!Util.empty(this.escuelaUsuarioService.listPagination$)) {
              if (this.escuelaUsuarioService.size$() < 5) {
                this.escuelaUsuarioService.addElementList$(data['escuela-usuario']);
              } else {
                this.escuelaUsuarioService.listPagination$ = null;
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

  openDialogUsuario(): void {
    const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.tipo = this.usuario.tipo.toUpperCase();
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.tipo = this.usuario.tipo;
    dialogRef.componentInstance.out.subscribe((element) => {
      this.usuario = new Usuario(
        element.email,
        null,
        element.id,
        element.nombre,
        element.nombre_uno,
        element.nombre_dos,
        element.apellido_uno,
        element.apellido_dos,
        element.tipo,
        element.cedula,
        element.telefono,
        element.celular,
        element.fechanacimiento,
        element.foto,
        element.sex,
        element.created_at,
        element.updated_at,
        null,
        element.localizacion);
      dialogRef.close();
    });
  }

  openDialogEscuela(): void {
    const dialogRef = this.dialog.open(ActualizarEscuelasComponent, {
      width: '950px',
    });

    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      this.escuela = new Escuela(
        element.sede,
        +element.id,
        element.nombre,
        element.created_at,
        element.updated_at);
      dialogRef.close();
    });
  }

  getControls(key: string) {
    return this.crearEscuelaUsuario.controls[key];
  }
}
