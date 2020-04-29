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
export class SedeComponent implements OnInit {
  localizacion: Localizacion = new Localizacion();
  crearSede;
  sede: Sede;
  activar: boolean;
  errors: any;
  actCrear: boolean;
  @ViewChild(GoogleMapsComponent) formulario: GoogleMapsComponent;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private sedeService: SedeService,
    private route: ActivatedRoute
  ) {

    this.sede = new Sede();
    this.route.paramMap.subscribe(params => {
      this.sede.id = +params.get('id');
    });

    this.crearSede = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
    });
    if (!Util.emptyNaN(this.sede.id)) {
      this.actCrear = true;
      this.sede = this.sedeService.buscarElementList$(this.sede);
      this.localizacion = this.sede.localizacion;
    }

  }

  ngOnInit(): void {

  }

  reciveLocalizacion(localizacion) {
    this.localizacion = localizacion;

  }

  getControls(key: string) {

    return this.crearSede.controls[key];
  }

  onSubmit() {
    if (this.formulario.formGoogle.invalid) {
      return;
    }
    if (this.crearSede.invalid) {
      return;
    }
    this.activar = true;
    this.sede.localizacion = this.localizacion;
    this.sedeService.store({ sede: this.sede }, 'sede/store').subscribe(
      data => {
        if (data['success']) {

          Util.openSnackBar(this.snackBar, 'Exito, Creación de sede.', 1, 'bottom');
          if (!this.actCrear) {
            if (!Util.empty(this.sedeService.listPagination$)) {
              if (this.sedeService.size$() < 5) {
                this.sedeService.addElementList$(data['sede']);
              } else {
                this.sedeService.listPagination$ = null;
              }
            }
            this.crearSede.reset();
          }
        } else {
          Util.openSnackBar(this.snackBar, 'Advertencia, Contacte con el administrador del sitio.', 2, 'bottom');
        }
        this.activar = false;

      }, error => {
        this.errors = error.error;
        Util.openSnackBar(this.snackBar, 'Error, Almacenando la información de la sede.', 3, 'top');
        this.activar = false;
      }
    );
  }
}
