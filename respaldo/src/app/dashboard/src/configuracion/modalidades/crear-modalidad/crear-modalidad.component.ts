import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Modalidad } from 'src/app/dashboard/modelo/modalidad';
import { PropertiesModalidad } from 'src/app/dashboard/properties/properties-modalidad';
import { ModalidadService } from 'src/app/dashboard/service/dashboard/modalidad.service';
import { MenuService } from 'src/app/dashboard/service/menu.service';
import { Util } from 'src/app/utils/util';
import { Validacion } from 'src/app/utils/validacion';

@Component({
  selector: 'app-crear-modalidad',
  templateUrl: './crear-modalidad.component.html',
  styleUrls: ['./crear-modalidad.component.css']
})
export class CrearModalidadComponent extends CrearBaseComponent implements OnInit {
  modalidad: Modalidad;
  constructor(
    public properties: PropertiesModalidad,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: ModalidadService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {

    super(route , service, snackBar);

    this.menuService.add$(properties.get('menu-modalidad').value);

    this.modalidad = new Modalidad();

    this.modalidad = !Util.empty(this.data) ? this.data : this.modalidad;

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
      tipo: Validacion.getCampoLetras(true),
      descripcion: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.onSubmit$(this.properties.get('route-modalidad').value , this.modalidad);
  }
}
