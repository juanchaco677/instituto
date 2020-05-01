import { LoginComponent } from './dashboard/login/login.component';
import { LoginGuard } from './guard/login/login.guard';
export const routes = [
  { path: '',
  canActivate:
  [
    LoginGuard
  ],
  component: LoginComponent },
  { path: '**', redirectTo: 'not-found' }
];
