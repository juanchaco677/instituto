import { PrincipalComponent } from './../principal/principal.component';

export const routesHome = [

  {
    path: '',
    component: PrincipalComponent,
  },
  { path: 'cerrar-sesion-es-pr', redirectTo: 'login-aula-virtual', pathMatch: 'full' },
];
