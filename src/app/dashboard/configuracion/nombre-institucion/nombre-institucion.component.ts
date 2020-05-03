import { CrearBaseConfiguracionComponent } from './../../../modelo/crear-base-configuracion-component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validacion } from 'src/app/utils/validacion';
import { ConfiguracionService } from 'src/app/service/dashboard/configuracion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-nombre-institucion',
  templateUrl: './nombre-institucion.component.html',
  styleUrls: ['./nombre-institucion.component.css']
})
export class NombreInstitucionComponent extends CrearBaseConfiguracionComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public configuracionService: ConfiguracionService,
    public snackBar: MatSnackBar,
  ) {
    super(configuracionService, snackBar, 'titulo');
    this.configuracionForm = this.formBuilder.group({
      value: Validacion.getCampoLetras(true),
    });
  }


  ngOnInit(): void {
    // this.consultarDatos();
  }


}
