import { Localizacion } from 'src/app/dashboard/modelo/localizacion';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validacion } from 'src/app/utils/validacion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
import { ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/dashboard/service/dashboard/sede.service';
import { GoogleMapsComponent } from 'src/app/dashboard/google-maps/google-maps.component';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Sede } from 'src/app/dashboard/modelo/sede';
import { PropertiesSede } from 'src/app/dashboard/properties/properties-sede';
import { MenuService } from 'src/app/dashboard/service/menu.service';
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
