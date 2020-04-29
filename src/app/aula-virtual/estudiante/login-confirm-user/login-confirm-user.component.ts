import { Component, OnInit } from '@angular/core';
import { Sesion } from 'src/app/utils/sesion';
import { EmailUsuarioCookie } from 'src/app/modelo/emailusuariocookie';
import { UsuarioService } from 'src/app/service/dashboard/usuario.service';
import { Usuario } from 'src/app/modelo/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-confirm-user',
  templateUrl: './login-confirm-user.component.html',
  styleUrls: ['./login-confirm-user.component.css']
})
export class LoginConfirmUserComponent implements OnInit {
  datos_personales:boolean=true;
  carrera:boolean=true;
  emailUsuarioCookie:EmailUsuarioCookie;
  usuario:Usuario;
  activar:boolean;
  constructor( private usuarioService: UsuarioService,  private router: Router) { }

  ngOnInit(): void {
    console.log("DATOS DEL EMAIL");
    console.log(Sesion.getCookie("email"));
    if(Sesion.getCookie("email")!=undefined && Sesion.getCookie("email")!=null
    && Sesion.getCookie("email")!=""){
     this.emailUsuarioCookie=JSON.parse(Sesion.getCookie("email"));
     console.log(this.emailUsuarioCookie.email);
    }
    Sesion.deleteCookie("email");
  }

  onSubmit(){
    this.activar=true;
    if(this.emailUsuarioCookie != null){
      this.usuarioService
      .login({ email: this.emailUsuarioCookie.email, password: this.emailUsuarioCookie.password })
      .subscribe(data => {
        this.usuario = data["usuario"];
        this.usuario.token = data["access_token"];
        Sesion.setUser(this.usuario);
        this.activar = false;
        this.router.navigate(["/administrator"]);
      });
   }else{
    this.activar=false;
   }
  }

}
