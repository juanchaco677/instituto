
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routesHome } from './routesHome';



@NgModule({
  imports: [RouterModule.forChild(routesHome)],
  exports: [RouterModule]
})
export class RouteHomeModule {

 }
