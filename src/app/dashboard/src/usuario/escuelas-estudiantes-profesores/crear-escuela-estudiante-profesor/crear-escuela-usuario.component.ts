import { CrearBaseComponent } from '../../../../modelo/crear-base-component';
import { EscuelaUsuario } from '../../../../modelo/escuela-usuario';
import { ActualizarProgramaComponent } from './../../../configuracion/programas/actualizar-programa/actualizar-programa.component';
import { EscuelaUsuarioService } from '../../../../service/dashboard/escuela-usuario.service';
import { MenuService } from '../../../../service/menu.service';
import { PropertiesEscuelaUsuarios } from '../../../../properties/properties-escuela-usuarios';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Validacion } from 'src/app/utils/validacion';
import { ActualizarUsuarioComponent } from '../../estudiantes-profesores/actualizar/actualizar-usuario.component';
import { Util } from 'src/app/utils/util';
import { Usuario } from 'src/app/dashboard/modelo/usuario';
import { Escuela } from 'src/app/dashboard/modelo/escuela';
import { Programa } from 'src/app/dashboard/modelo/programa';
import { ActualizarEscuelasComponent } from '../../../configuracion/escuelas/actualizar-escuelas/actualizar-escuelas.component';
@Component({
  selector: 'app-crear-escuela-usuario',
  templateUrl: './crear-escuela-usuario.component.html',
  styleUrls: ['./crear-escuela-usuario.component.css'],
})
export class CrearEscuelaUsuarioComponent
  extends CrearBaseComponent
  implements OnInit {
  escuelaUsuario: EscuelaUsuario;
  matFormFieldUsuario: any;
  constructor(
    public dialog: MatDialog,
    public properties: PropertiesEscuelaUsuarios,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: EscuelaUsuarioService,
    public route: ActivatedRoute,
    private menuService: MenuService
  ) {
    super(route, service, snackBar);

    // tslint:disable-next-line: max-line-length
    this.menuService.add$(
      this.tipo === 'PR'
        ? properties.get('menu-escuela-profesor').value
        : properties.get('menu-escuela-estudiante').value
    );

    this.matFormFieldUsuario =
      this.tipo === 'PR'
        ? properties.get('mat-form-field-profesor')
        : properties.get('mat-form-field-estudiante');

    this.escuelaUsuario = new EscuelaUsuario(
      new Usuario(),
      new Escuela(),
      new Programa()
    );

    this.escuelaUsuario = !Util.empty(this.data)
      ? this.data
      : this.escuelaUsuario;

    this.crear = this.formBuilder.group({
      escuela: Validacion.getCampoLetras(true),
      usuario: Validacion.getCampoLetras(true),
      programa: Validacion.getCampoLetras(true),
      anioInicial: Validacion.getCampoNumero(true, 1, 4),
      anioFinal: Validacion.getCampoNumero(true, 1, 4),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.onSubmit$(
      this.properties.get('route-escuela-usuario').value,
      this.escuelaUsuario
    );
  }
  openDialogUsuario(): void {
    const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.tipo = this.tipo;
    dialogRef.componentInstance.combobox = true;

    dialogRef.componentInstance.consultarDatos(0, '');

    dialogRef.componentInstance.out.subscribe((element: Usuario) => {
      const usuario = new Usuario(
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
        element.localizacion
      );
      this.escuelaUsuario.usuario = usuario;
      dialogRef.close();
    });
  }

  openDialogEscuela(): void {
    const dialogRef = this.dialog.open(ActualizarEscuelasComponent, {
      width: '950px',
    });

    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element: Escuela) => {
      const escuela = new Escuela(
        element.sede,
        +element.id,
        element.nombre,
        element.created_at,
        element.updated_at
      );
      this.escuelaUsuario.escuela = escuela;
      dialogRef.close();
    });
  }

  openDialogPrograma(): void {
    const dialogRef = this.dialog.open(ActualizarProgramaComponent, {
      width: '950px',
    });

    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element: Escuela) => {
      const programa = new Programa(element.id, element.nombre);

      this.escuelaUsuario.programa = programa;
      dialogRef.close();
    });
  }

  getControls(key: string) {
    return this.crear.controls[key];
  }
}
