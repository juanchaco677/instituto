import { MenuService } from './../../../../service/menu.service';
import { PropertiesEscuela } from './../../../../properties/properties-escuelas';
import { Escuela } from './../../../../modelo/escuela';
import { CrearBaseComponent } from './../../../../modelo/crear-base-component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validacion } from 'src/app/utils/validacion';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarSedeComponent } from '../../sede/actualizar-sede/actualizar-sede.component';
import { Sede } from 'src/app/modelo/sede';
import { EscuelaService } from 'src/app/service/dashboard/escuela.service';
import { Util } from 'src/app/utils/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.css']
})
export class EscuelasComponent extends CrearBaseComponent implements OnInit {
  escuela: Escuela;

  constructor(
    public dialog: MatDialog,
    public properties: PropertiesEscuela,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: EscuelaService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-escuela').value);

    this.escuela = new Escuela(new Sede());

    this.escuela = !Util.empty(this.data) ? this.data : this.escuela;

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
      sede: Validacion.getCampoLetras(true)
    });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.onSubmit$(this.properties.get('route-escuela').value, this.escuela);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ActualizarSedeComponent, {
      width: '950px',
    });
    dialogRef.componentInstance.combobox = true;
    dialogRef.componentInstance.out.subscribe((element) => {
      const sede = new Sede(
        element.id,
        element.nombre,
        element.localizacion,
        element.created_at,
        element.updated_at
      );
      this.escuela.sede = sede;
      dialogRef.close();
    });

  }
}



