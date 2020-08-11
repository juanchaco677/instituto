import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validacion } from 'src/app/utils/validacion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
import { ActivatedRoute } from '@angular/router';
import { MateriaService } from 'src/app/dashboard/service/dashboard/materia.service';
import { CrearBaseComponent } from 'src/app/dashboard/modelo/crear-base-component';
import { Materia } from 'src/app/dashboard/modelo/materia';
import { PropertiesMateria } from 'src/app/dashboard/properties/properties-materias';
import { MenuService } from 'src/app/dashboard/service/menu.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent extends CrearBaseComponent implements OnInit {
  materia: Materia;

  constructor(
    public properties: PropertiesMateria,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public service: MateriaService,
    public route: ActivatedRoute,
    private menuService: MenuService,
  ) {
    super(route , service, snackBar);

    this.menuService.add$(properties.get('menu-materia').value);

    this.materia = new Materia();

    this.materia = !Util.empty(this.data) ? this.data : this.materia;

    this.crear = this.formBuilder.group({
      nombre: Validacion.getCampoLetras(true),
      credito: Validacion.getCampoNumero(true, 1, 2),
    });

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.onSubmit$(this.properties.get('route-materia').value, this.materia);
  }
}
