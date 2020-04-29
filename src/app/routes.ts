import { LoginComponent } from "./dashboard/login/login.component";
'./dashboard/usuario/crud/actualizar/actualizar.component';
import { GoogleMapsComponent } from './dashboard/google-maps/google-maps.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { LoginGuard } from './guard/login/login.guard';
export const routes = [
  { path: "",
  canActivate:[LoginGuard],
  component: LoginComponent },
  { path: "google", component: GoogleMapsComponent },
  { path: "**", redirectTo: "not-found" }
];
