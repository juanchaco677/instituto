import { ActualizarProgramaComponent } from './../../../programas/actualizar-programa/actualizar-programa.component';
import { ActualizarEscuelasComponent } from './../../actualizar-escuelas/actualizar-escuelas.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { EscuelaPrograma } from 'src/app/dashboard/modelo/escuela-programa';
import { Escuela } from 'src/app/dashboard/modelo/escuela';
import { Programa } from 'src/app/dashboard/modelo/programa';
import { PropertiesEscuelaPrograma } from 'src/app/dashboard/properties/properties-escuela-programa';
import { EscuelaProgramaService } from 'src/app/dashboard/service/dashboard/escuela-programa.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';

@Component({
  selector: 'app-crear-escuela-programa',
  templateUrl: './crear-escuela-programa.component.html',
  styleUrls: ['./crear-escuela-programa.component.css']
})
export class CrearEscuelaProgramaComponent extends CrearBaseComponent implements OnInit {
  escuelaPrograma: EscuelaPrograma;
  matFormFieldUsuario: any;
  constructor(
    public dialog: MatDialog,
    public properties: PropertiesEscuelaPrograma,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: EscuelaProgramaService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route , service , snackBar);
    this.route.paramMap.subscribe(params => {
      const compoundKey = params.get('compoundKey');
      if (!Util.empty(compoundKey)) {
        this.actCrear = true;
        this.data = this.service.buscarElementList$({ id: compoundKey});
      }
    });
    // tslint:disable-next-line: max-line-length
    this.menuService.add$(this.tipo === 'PR' ? properties.get('menu-escuela-programa').value : properties.get('menu-escuela-estudiante').value);

    this.matFormFieldUsuario = this.tipo === 'PR' ? properties.get('mat-form-field-programa') : properties.get('mat-form-field-estudiante');


    this.escuelaPrograma = new EscuelaPrograma(new Escuela(), new Programa());

    this.escuelaPrograma = !Util.empty(this.data) ? this.data : this.escuelaPrograma;

    this.crear = this.formBuilder.group({
      escuela: Validacion.getCampoLetras(true),
      programa: Validacion.getCampoLetras(true),
      anioInicial: Validacion.getCampoNumero(true, 1, 4),
      anioFinal: Validacion.getCampoNumero(true, 1, 4),
    });


  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.onSubmit$(this.properties.get('route-escuela-programa').value, this.escuelaPrograma);
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
        element.updated_at);
      this.escuelaPrograma.escuela = escuela;
      dialogRef.close();
    });
  }

  openDialogPrograma(): void {
    const dialogRef = this.dialog.open(ActualizarProgramaComponent, {
      width: '950px',
    });

    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element: Escuela) => {
      const programa = new Programa(
        element.id,
        element.nombre
      );

      this.escuelaPrograma.programa = programa;
      dialogRef.close();
    });
  }

  getControls(key: string) {
    return this.crear.controls[key];
  }
}
