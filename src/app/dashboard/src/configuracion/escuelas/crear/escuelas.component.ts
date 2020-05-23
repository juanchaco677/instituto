import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validacion } from 'src/app/utils/validacion';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarSedeComponent } from '../../sede/actualizar-sede/actualizar-sede.component';
import { EscuelaService } from 'src/app/dashboard/service/dashboard/escuela.service';
import { Util } from 'src/app/utils/util';
import { ActivatedRoute } from '@angular/router';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Escuela } from 'src/app/dashboard/modelo/escuela';
import { Sede } from 'src/app/dashboard/modelo/sede';
import { PropertiesEscuela } from 'src/app/dashboard/properties/properties-escuelas';
import { MenuService } from 'src/app/dashboard/service/menu.service';

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
        element.localizacion,
        element.id,
        element.nombre,
        element.created_at,
        element.updated_at
      );
      this.escuela.sede = sede;
      dialogRef.close();
    });

  }
}



