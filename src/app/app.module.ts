import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule  } from '@angular/forms';
import {routes} from './routes';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/module/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstudianteModule } from './aula-virtual/estudiante/modulo/estudiante/estudiante.module';
import { LoginGuard } from './guard/login/login.guard';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DashboardModule,
    EstudianteModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent


  ],
  providers: [LoginGuard ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
