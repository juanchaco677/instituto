import { ActualizarModalidadComponent } from './../../../modalidades/actualizar-modalidad/actualizar-modalidad.component';
import { ActualizarProgramaComponent } from './../../actualizar-programa/actualizar-programa.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { ProgramaModalidad } from 'src/app/dashboard/modelo/programa-modalidad';
import { Programa } from 'src/app/dashboard/modelo/programa';
import { Modalidad } from 'src/app/dashboard/modelo/modalidad';
import { PropertiesProgramaModalidad } from 'src/app/dashboard/properties/properties-programa-modalidad';
import { ProgramaModalidadService } from 'src/app/dashboard/service/dashboard/programa-modalidad.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';

@Component({
  selector: 'app-crear-programa-modalidad',
  templateUrl: './crear-programa-modalidad.component.html',
  styleUrls: ['./crear-programa-modalidad.component.css']
})
export class CrearProgramaModalidadComponent extends CrearBaseComponent implements OnInit {
  programaModalidad: ProgramaModalidad;

  constructor(
    public dialog: MatDialog,
    public properties: PropertiesProgramaModalidad,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public lineaMateriaService: ProgramaModalidadService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route , lineaMateriaService, snackBar);

    this.menuService.add$(properties.get('menu-programa-modalidad').value);

    this.programaModalidad = new ProgramaModalidad(new Programa() , new Modalidad());

    this.programaModalidad = !Util.empty(this.data) ? this.data : this.programaModalidad;

    this.crear = this.formBuilder.group({
      programa: Validacion.getCampoLetras(true),
      modalidad: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.onSubmit$(this.properties.get('route-programa-modalidad').value, this.programaModalidad);
  }


  openDialogMateriaOrigen(): void {
    const dialogRef = this.dialog.open(ActualizarProgramaComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const programa = new Programa(
        element.id,
        element.nombre
      );
      programa.created_at = element.created_at;
      programa.updated_at = element.updated_at;
      this.programaModalidad.programa = programa;
      dialogRef.close();
    });
  }

  openDialogMateria(): void {
    const dialogRef = this.dialog.open(ActualizarModalidadComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const modalidad = new Modalidad(
        element.id,
        element.tipo,
        element.nombre,
        element.descripcion,
        element.created_at,
        element.updated_at
      );
      this.programaModalidad.modalidad = modalidad;
      dialogRef.close();
    });
  }


}












