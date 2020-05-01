import { PropertiesPrograma } from './../../../../properties/properties-programa';
import { MenuService } from './../../../../service/menu.service';
import { CrearBaseComponent } from './../../../../modelo/crear-base-component';
import { Util } from './../../../../utils/util';
import { Validacion } from './../../../../utils/validacion';
import { ActivatedRoute } from '@angular/router';
import { ProgramaService } from './../../../../service/dashboard/programa.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Programa } from './../../../../modelo/programa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-programa',
  templateUrl: './crear-programa.component.html',
  styleUrls: ['./crear-programa.component.css']
})
export class CrearProgramaComponent  extends CrearBaseComponent  implements OnInit {

  crear;
  programa: Programa;
  activar: boolean;
  errors: any;
  actCrear: boolean;

  constructor(
    public properties: PropertiesPrograma,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public programaService: ProgramaService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route , programaService, snackBar);

    this.menuService.add$(properties.get('m-t-plan').value);

    this.programa = new Programa();

    this.programa = !Util.empty(this.data) ? this.data : this.programa;

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
    });

  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.onSubmit$(this.properties.get('r-programa').value, this.programa);
  }
}
