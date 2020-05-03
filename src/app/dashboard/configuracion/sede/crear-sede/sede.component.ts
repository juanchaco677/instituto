import { CrearBaseComponent } from './../../../../modelo/crear-base-component';
import { MenuService } from './../../../../service/menu.service';
import { PropertiesSede } from './../../../../properties/properties-sede';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Localizacion } from 'src/app/modelo/localizacion';
import { FormBuilder } from '@angular/forms';
import { Validacion } from 'src/app/utils/validacion';
import { Sede } from 'src/app/modelo/sede';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
import { ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/service/dashboard/sede.service';
import { GoogleMapsComponent } from 'src/app/dashboard/google-maps/google-maps.component';
@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent extends CrearBaseComponent implements OnInit {
  sede: Sede = new Sede(new Localizacion() );
  @ViewChild(GoogleMapsComponent) formulario: GoogleMapsComponent;
  constructor(
    public properties: PropertiesSede,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: SedeService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route, service, snackBar);
    this.menuService.add$(properties.get('menu-sede').value);
    this.sede = !Util.empty(this.data) ? this.data : this.sede;
    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.formulario.formGoogle.invalid) {
      return;
    }
    this.onSubmit$(this.properties.get('route-sede').value, this.sede);
  }

  reciveLocalizacion(localizacion) {
    this.sede.localizacion = localizacion;

  }
}
