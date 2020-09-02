import { LoginAulaVirtualComponent } from './aula-virtual/src/pantalla-base/login-aula-virtual/login-aula-virtual.component';
import { LoginComponent } from './dashboard/src/login/login.component';
import { LoginGuard } from './dashboard/guard/login/login.guard';
import { PrincipalComponent } from './src/principal/principal.component';
export const routes = [
  { path: 'login-admin', canActivate: [LoginGuard], component: LoginComponent },
  {
    path: 'login-aula-virtual',
    component: LoginAulaVirtualComponent,
  },
  {
    path: '',
    component: PrincipalComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];
