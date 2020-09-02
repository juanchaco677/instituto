import { NavbarPrincipalMModule } from './src/navbar-principal/navbar-principal-m/navbar-principal-m.module';
import { MaterialModule } from './dashboard/module/material/material.module';
import { ThemeService } from './theme.service';
import { AulaVirtualModule } from './aula-virtual/module/aula-virtual/aula-virtual.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './routes';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/module/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginGuard } from './dashboard/guard/login/login.guard';
import { PrincipalComponent } from './src/principal/principal.component';

@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    AulaVirtualModule,
    DashboardModule,
    NavbarPrincipalMModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [AppComponent, PrincipalComponent],
  providers: [LoginGuard, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {

}
