import { PlanService } from './../../../service/dashboard/plan.service';
import { ProgramaService } from './../../../service/dashboard/programa.service';
import { LineaMateriaService } from './../../../service/dashboard/linea-materia.service';
import { EliminarLineaMateriasComponent } from './../../configuracion/materias/lineas/eliminar-linea-materias/eliminar-linea-materias.component';
import { MenuService } from './../../../service/menu.service';
import { MateriaService } from 'src/app/service/dashboard/materia.service';
import { MateriaComponent } from './../../configuracion/materias/crear/materia.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../service/dashboard/usuario.service';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { PlantillaComponent } from '../../usuario/estudiantes-profesores/plantilla/plantilla.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { BtnUploadOneFileComponent } from 'src/app/btn-upload-one-file/btn-upload-one-file.component';
import { GoogleMapsComponent } from '../../google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';
import { BootstrapAlertsComponent } from '../../../bootstrap-alerts/bootstrap-alerts.component';
import { LoginComponent } from 'src/app/dashboard/login/login.component';
import { LoadingModule } from 'src/app/loading/loading.module';
import { NombreInstitucionComponent } from '../../configuracion/nombre-institucion/nombre-institucion.component';
import { MisionComponent } from '../../configuracion/mision/mision.component';
import { VisionComponent } from '../../configuracion/vision/vision.component';
import { PlantillaConfiguracionComponent } from '../../configuracion/plantilla-configuracion/plantilla-configuracion.component';
import { LogoComponent } from '../../configuracion/logo/logo.component';
import { ConfiguracionService } from 'src/app/service/dashboard/configuracion.service';
import { SedeService } from 'src/app/service/dashboard/sede.service';
import { PlantillaDashboardComponent } from '../../pantallas-base/plantilla/plantilla-dashboard.component';
import { NavbarComponent } from '../../pantallas-base/navbar/navbar.component';
import { MenuLateralComponent } from '../../pantallas-base/menu-lateral/menu-lateral.component';
import { PresentacionDashboardComponent } from '../../noticias/presentacion-dashboard/presentacion-dashboard.component';
import { SedeComponent } from '../../configuracion/sede/crear-sede/sede.component';
import { ActualizarSedeComponent } from '../../configuracion/sede/actualizar-sede/actualizar-sede.component';
import { EliminarSedeComponent } from '../../configuracion/sede/eliminar-sede/eliminar-sede.component';
import { PlantillaSedeComponent } from '../../configuracion/sede/plantilla-sede/plantilla-sede.component';
import { EscuelasComponent } from '../../configuracion/escuelas/crear/escuelas.component';
import { ActualizarEscuelasComponent } from '../../configuracion/escuelas/actualizar-escuelas/actualizar-escuelas.component';
import { EliminarEscuelasComponent } from '../../configuracion/escuelas/eliminar-escuelas/eliminar-escuelas.component';
import { PlantillaEscuelasComponent } from '../../configuracion/escuelas/plantilla-escuelas/plantilla-escuelas.component';
import { EscuelaService } from 'src/app/service/dashboard/escuela.service';
import { PerfilComponent } from '../../usuario/estudiantes-profesores/perfil/perfil.component';
import { PlantillaEscuelaUsuarioComponent } from '../../usuario/escuelas-estudiantes-profesores/plantilla-escuela-usuario/plantilla-escuela-usuario.component';
import { CrearEscuelaUsuarioComponent } from '../../usuario/escuelas-estudiantes-profesores/crear-escuela-estudiante-profesor/crear-escuela-usuario.component';
import { EliminarEscuelaUsuarioComponent } from '../../usuario/escuelas-estudiantes-profesores/eliminar-escuela-estudiante-profesor/eliminar-escuela-usuario.component';
import { EliminarUsuarioComponent } from '../../usuario/estudiantes-profesores/eliminar/eliminar-usuario.component';
import { ActualizarUsuarioComponent } from '../../usuario/estudiantes-profesores/actualizar/actualizar-usuario.component';
import { CrearUsuarioComponent } from '../../usuario/estudiantes-profesores/crear/crear-usuario.component';
import { EscuelaUsuarioService } from 'src/app/service/dashboard/escuela-usuario.service';
import { AuthGuard } from 'src/app/guard/auth/auth.guard';
import { ActualizarMateriasComponent } from '../../configuracion/materias/actualizar-materias/actualizar-materias.component';
import { EliminarMateriasComponent } from '../../configuracion/materias/eliminar-materias/eliminar-materias.component';
import { PlantillaMateriaComponent } from '../../configuracion/materias/plantilla-materia/plantilla-materia.component';
import { SidenavComponent } from '../../pantallas-base/sidenav/sidenav.component';
import { LineaMateriasComponent } from '../../configuracion/materias/lineas/linea-materias/linea-materias.component';
import { PlantillaLineaMateriasComponent } from '../../configuracion/materias/lineas/plantilla-linea-materias/plantilla-linea-materias.component';
import { CrearProgramaComponent } from '../../configuracion/programas/crear-programa/crear-programa.component';
import { EliminarProgramaComponent } from '../../configuracion/programas/eliminar-programa/eliminar-programa.component';
import { ActualizarProgramaComponent } from '../../configuracion/programas/actualizar-programa/actualizar-programa.component';
import { PlantillaProgramaComponent } from '../../configuracion/programas/plantilla-programa/plantilla-programa.component';
import { CrearPlanComponent } from '../../configuracion/plan/crear-plan/crear-plan.component';
import { ActualizarPlanComponent } from '../../configuracion/plan/actualizar-plan/actualizar-plan.component';
import { EliminarPlanComponent } from '../../configuracion/plan/eliminar-plan/eliminar-plan.component';
import { PlantillaPlanComponent } from '../../configuracion/plan/plantilla-plan/plantilla-plan.component';
import { PlantillaCRUDComponent } from '../../pantallas-base/plantilla-crud/plantilla-crud.component';
import { PropertiesPrograma } from 'src/app/properties/properties-programa';
import { PropertiesPlan } from 'src/app/properties/properties-plan';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    BrowserModule,
    LoadingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpgmyUAUnqX1-HYVZpAI-aO7cbFfjkpos',
      libraries: ['places']
    })
  ],
  declarations: [
    EliminarUsuarioComponent,
    PlantillaDashboardComponent,
    NavbarComponent,
    MenuLateralComponent,
    PerfilComponent,
    PresentacionDashboardComponent,
    ActualizarUsuarioComponent,
    CrearUsuarioComponent,
    SedeComponent,
    NombreInstitucionComponent,
    MisionComponent,
    VisionComponent,
    PlantillaConfiguracionComponent,
    LogoComponent,
    PlantillaComponent,
    BtnUploadOneFileComponent,
    GoogleMapsComponent,
    BootstrapAlertsComponent,
    LoginComponent,
    ActualizarSedeComponent,
    EliminarSedeComponent,
    PlantillaSedeComponent,
    EscuelasComponent,
    ActualizarEscuelasComponent,
    EliminarEscuelasComponent,
    PlantillaEscuelasComponent,
    CrearEscuelaUsuarioComponent,
    ActualizarEscuelasComponent,
    EliminarEscuelaUsuarioComponent,
    PlantillaEscuelaUsuarioComponent,
    MateriaComponent,
    ActualizarMateriasComponent,
    EliminarMateriasComponent,
    PlantillaMateriaComponent,
    SidenavComponent,
    LineaMateriasComponent,
    EliminarLineaMateriasComponent,
    PlantillaLineaMateriasComponent,
    CrearProgramaComponent,
    EliminarProgramaComponent,
    ActualizarProgramaComponent,
    PlantillaProgramaComponent,
    CrearPlanComponent,
    ActualizarPlanComponent,
    EliminarPlanComponent,
    PlantillaPlanComponent,
    PlantillaCRUDComponent
  ],
  exports: [
  ],

  providers: [
    AuthGuard,
    UsuarioService,
    SedeService,
    EscuelaService,
    EscuelaUsuarioService,
    ConfiguracionService,
    MateriaService,
    MenuService,
    LineaMateriaService,
    ProgramaService,
    PropertiesPrograma,
    PlanService,
    PropertiesPlan
  ]
})
export class DashboardModule { }
