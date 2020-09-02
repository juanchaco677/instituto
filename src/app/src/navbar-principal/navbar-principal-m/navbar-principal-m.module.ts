import { MaterialModule } from './../../../dashboard/module/material/material.module';
import { RouteHomeModule } from './../../route/routeHome.module';
import { NavbarPrincipalComponent } from './../navbar-principal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [RouteHomeModule, CommonModule, MaterialModule],
  declarations: [NavbarPrincipalComponent],
  exports: [NavbarPrincipalComponent],
})
export class NavbarPrincipalMModule {}
