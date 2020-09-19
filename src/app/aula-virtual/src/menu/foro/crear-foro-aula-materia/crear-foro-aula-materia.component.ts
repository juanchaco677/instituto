import { Sesion } from './../../../../../utils/sesion';
import { AsigProfeAsigs } from 'src/app/dashboard/modelo/asig-profe-asigs';
import { VerAsigProfeAsigsComponent } from './../../../ver-asig-profe-asigs/ver-asig-profe-asigs.component';
import { Materia } from './../../../../../dashboard/modelo/materia';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarMateriasComponent } from './../../../../../dashboard/src/configuracion/materias/actualizar-materias/actualizar-materias.component';
import { Validacion } from './../../../../../utils/validacion';
import { Util } from './../../../../../utils/util';
import { MenuService } from './../../../../../dashboard/service/menu.service';
import { ActivatedRoute } from '@angular/router';
import { ForoAulaMateriaService } from './../../../../service/foro-aula-materia.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesForoAualaMateria } from './../../../../properties/properties-foro-aula-materia';
import { CrearBaseComponent } from './../../../../../dashboard/modelo/crear-base-component';
import { ForoAulaMateria } from './../../../../model/foro-aula-materia';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-foro-aula-materia',
  templateUrl: './crear-foro-aula-materia.component.html',
  styleUrls: ['./crear-foro-aula-materia.component.css'],
})
export class CrearForoAulaMateriaComponent
  extends CrearBaseComponent
  implements OnInit {
  aulaForoMateria: ForoAulaMateria;

  constructor(
    public dialog: MatDialog,
    public properties: PropertiesForoAualaMateria,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: ForoAulaMateriaService,
    public route: ActivatedRoute,
    private menuService: MenuService
  ) {
    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-foro-aula-materia').value);

    this.aulaForoMateria = new ForoAulaMateria();

    this.aulaForoMateria = !Util.empty(this.data)
      ? this.data
      : this.aulaForoMateria;

    this.crear = this.formBuilder.group({
      materia: Validacion.getCampoLetras(true),
      titulo: Validacion.getCampoLetras(true),
      descripcion: Validacion.getCampo(true),
    });
  }

  addElement(data: any){
    this.aulaForoMateria = data;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.aulaForoMateria.profesor = Sesion.user();
    this.onSubmit$(
      this.properties.get('route-foro-aula-materia').value,
      this.aulaForoMateria
    );
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
      this.aulaForoMateria.materia = materia;
      dialogRef.close();
    });
  }

}
