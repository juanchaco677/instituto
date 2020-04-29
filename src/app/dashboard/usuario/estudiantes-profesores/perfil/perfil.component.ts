import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil;
  usuario: Usuario;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {

    this.perfil = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.usuario = new Usuario('cooreo', 'contrasena');
    this.route.paramMap.subscribe(params => {
      this.usuario.id = +params.get('id') ;
      this.usuario.tipo = params.get('tipo');
    });

  }

  ngOnInit() {
  }

  onSubmit(customerData) {

  }
}
