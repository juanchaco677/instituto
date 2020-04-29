import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from './material/material.module';
import { LoginConfirmUserComponent } from '../../login-confirm-user/login-confirm-user.component';
import { EstudianteRoutingModule } from './estudiante-routing/estudiante-routing.module';
import { UsuarioService } from 'src/app/service/dashboard/usuario.service';
import { LoadingComponent } from 'src/app/loading/loading.component';
import { LoadingModule } from 'src/app/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    EstudianteRoutingModule,
    LoadingModule,
],
  declarations: [
    LoginConfirmUserComponent,

  ],
  exports: [

    ],

  providers: [UsuarioService]
})
export class EstudianteModule { }
