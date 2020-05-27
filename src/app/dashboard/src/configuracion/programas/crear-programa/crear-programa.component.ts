import { MatDialog } from '@angular/material/dialog';
import { NivelEducativo } from './../../../../modelo/nivel-educativo';
import { ActualizarNivelComponent } from './../../nivel-educativo/actualizar-nivel/actualizar-nivel.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Programa } from 'src/app/dashboard/modelo/programa';
import { PropertiesPrograma } from 'src/app/dashboard/properties/properties-programa';
import { ProgramaService } from 'src/app/dashboard/service/dashboard/programa.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';

@Component({
  selector: 'app-crear-programa',
  templateUrl: './crear-programa.component.html',
  styleUrls: ['./crear-programa.component.css']
})
export class CrearProgramaComponent  extends CrearBaseComponent  implements OnInit {
  programa: Programa;

  constructor(
    public dialog: MatDialog,
    public properties: PropertiesPrograma,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public programaService: ProgramaService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route , programaService, snackBar);

    this.menuService.add$(properties.get('m-t-plan').value);

    this.programa = new Programa();
    this.programa.nivel_academico = new NivelEducativo();

    this.programa = !Util.empty(this.data) ? this.data : this.programa;

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
      nivelAcademico: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.onSubmit$(this.properties.get('r-programa').value, this.programa);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ActualizarNivelComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const nivelAcademico = new NivelEducativo(
        element.id,
        element.nombre,
        element.tipo,
        element.created,
        element.updated
      );
      this.programa.nivel_academico = nivelAcademico;
      dialogRef.close();
    });
  }
}
