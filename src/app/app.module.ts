import { AulaVirtualModule } from './aula-virtual/module/aula-virtual/aula-virtual.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule  } from '@angular/forms';
import {routes} from './routes';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/module/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginGuard } from './dashboard/guard/login/login.guard';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AulaVirtualModule,
    DashboardModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [LoginGuard ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
