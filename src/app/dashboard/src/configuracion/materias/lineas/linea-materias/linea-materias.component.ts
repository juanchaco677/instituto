import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { LineaMateria } from 'src/app/dashboard/modelo/linea-materia';
import { Materia } from 'src/app/dashboard/modelo/materia';
import { PropertiesMateriaLinea } from 'src/app/dashboard/properties/properties-materias-linea';
import { LineaMateriaService } from 'src/app/dashboard/service/dashboard/linea-materia.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';
import { ActualizarMateriasComponent } from '../../actualizar-materias/actualizar-materias.component';

@Component({
  selector: 'app-linea-materias',
  templateUrl: './linea-materias.component.html',
  styleUrls: ['./linea-materias.component.css']
})
export class LineaMateriasComponent extends CrearBaseComponent implements OnInit {
  lineaMateria: LineaMateria;

  constructor(
    public dialog: MatDialog,
    public properties: PropertiesMateriaLinea,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public lineaMateriaService: LineaMateriaService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route , lineaMateriaService, snackBar);

    this.menuService.add$(properties.get('menu-titulo-materia-linea').value);

    this.lineaMateria = new LineaMateria(new Materia() , new Materia());

    this.lineaMateria = !Util.empty(this.data) ? this.data : this.lineaMateria;

    this.crear = this.formBuilder.group({
      materiaOrigen: Validacion.getCampoLetras(true),
      materia: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.onSubmit$(this.properties.get('route-materia-linea').value, this.lineaMateria);
  }


  openDialogMateriaOrigen(): void {
    const dialogRef = this.dialog.open(ActualizarMateriasComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const materiaOrigen = new Materia(
        element.id,
        element.nombre,
        element.credito,
        element.created,
        element.updated
      );
      this.lineaMateria.materia_origen = materiaOrigen;
      dialogRef.close();
    });
  }

  openDialogMateria(): void {
    const dialogRef = this.dialog.open(ActualizarMateriasComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const materia = new Materia(
        element.id,
        element.nombre,
        element.credito,
        element.created_at,
        element.updated_at
      );
      this.lineaMateria.materia = materia;
      dialogRef.close();
    });
  }


}
















