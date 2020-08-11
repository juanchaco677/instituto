import { PropertiesSalones } from './../../../../properties/properties-salones';
import { ActualizarSedeComponent } from './../../sede/actualizar-sede/actualizar-sede.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Salon } from 'src/app/dashboard/modelo/salon';
import { Sede } from 'src/app/dashboard/modelo/sede';
import { SalonService } from 'src/app/dashboard/service/dashboard/salon.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';
@Component({
  selector: 'app-crear-salon',
  templateUrl: './crear-salon.component.html',
  styleUrls: ['./crear-salon.component.css']
})
export class CrearSalonComponent extends CrearBaseComponent implements OnInit {
  salon: Salon;

  constructor(
    public dialog: MatDialog,
    public properties: PropertiesSalones,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: SalonService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route, service, snackBar);

    this.menuService.add$(properties.get('menu-salon').value);

    this.salon = new Salon(new Sede());

    this.salon = !Util.empty(this.data) ? this.data : this.salon;

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampo(true),
      sede: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.onSubmit$(this.properties.get('route-salon').value, this.salon);
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
        element.created,
        element.updated
      );
      this.salon.sede = sede;
      dialogRef.close();
    });
  }

}
