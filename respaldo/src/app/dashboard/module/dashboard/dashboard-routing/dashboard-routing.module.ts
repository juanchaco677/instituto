import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {routes} from '../routes/dashboard_routes';


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }