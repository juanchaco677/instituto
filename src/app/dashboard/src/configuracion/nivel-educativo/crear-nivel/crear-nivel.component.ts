import { Util } from './../../../../../utils/util';
import { Validacion } from './../../../../../utils/validacion';
import { MenuService } from './../../../../service/menu.service';
import { ActivatedRoute } from '@angular/router';
import { NivelEsucativoService } from './../../../../service/dashboard/nivel-esucativo.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertiesNivelEducativo } from './../../../../properties/properties-nivel-educativo';
import { CrearBaseComponent } from './../../../../modelo/crear-base-component';
import { Component, OnInit } from '@angular/core';
import { NivelEducativo } from 'src/app/dashboard/modelo/nivel-educativo';

@Component({
  selector: 'app-crear-nivel',
  templateUrl: './crear-nivel.component.html',
  styleUrls: ['./crear-nivel.component.css']
})
export class CrearNivelComponent extends CrearBaseComponent implements OnInit {
  nivelEducativo: NivelEducativo;

  constructor(
    public properties: PropertiesNivelEducativo,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: NivelEsucativoService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route , service, snackBar);

    this.menuService.add$(properties.get('menu-nivel-educativo').value);

    this.nivelEducativo = new NivelEducativo();

    this.nivelEducativo = !Util.empty(this.data) ? this.data : this.nivelEducativo;

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
      tipo: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.onSubmit$(this.properties.get('route-nivel-educativo').value, this.nivelEducativo);
  }
}
