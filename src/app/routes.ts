import { LoginComponent } from './dashboard/src/login/login.component';
import { LoginGuard } from './dashboard/guard/login/login.guard';
export const routes = [
  { path: '',
  canActivate:
  [
    LoginGuard
  ],
  component: LoginComponent },
  { path: '**', redirectTo: 'not-found' }
];
