import { PropertiesEscuelaPrograma } from '../../properties/properties-escuela-programa';
import { EscuelaProgramaService } from '../../service/dashboard/escuela-programa.service';
import { PropertiesProgramacionHorario } from '../../properties/properties-programacion-horario';
import { ProgramacionHorarioService } from '../../service/dashboard/programacion-horario.service';
import { AsigProfeAsigsService } from '../../service/dashboard/asig-profe-asigs.service';
import { PropertiesSalon } from '../../properties/properties-salon';
import { SalonService } from '../../service/dashboard/salon.service';
import { PropertiesProgramaModalidad } from '../../properties/properties-programa-modalidad';
import { ProgramaModalidadService } from '../../service/dashboard/programa-modalidad.service';
import { ModalidadService } from '../../service/dashboard/modalidad.service';
import { PropertiesModalidad } from '../../properties/properties-modalidad';
import { PropertiesLoginDashboard } from '../../properties/properties-login-dashboard';
import { UploadDragDropComponent } from './../../../upload-drag-drop/upload-drag-drop.component';
import { NoticiaService } from '../../service/dashboard/noticia.service';
import { PropertiesNoticia } from '../../properties/properties-noticia';
import { PropertiesUsuario } from '../../properties/properties-usuario';
import { PropertiesPlanEstudio } from '../../properties/properties-plan-estudio';
import { PlanEstudioService } from '../../service/dashboard/plan-estudio.service';
import { PropertiesEscuelaUsuarios } from '../../properties/properties-escuela-usuarios';
import { PropertiesSede } from '../../properties/properties-sede';
import { PropertiesEscuela } from '../../properties/properties-escuelas';
import { PropertiesPrograma } from 'src/app/dashboard/properties/properties-programa';
import { PropertiesMateriaLinea } from '../../properties/properties-materias-linea';
import { PlanService } from '../../service/dashboard/plan.service';
import { ProgramaService } from '../../service/dashboard/programa.service';
import { LineaMateriaService } from '../../service/dashboard/linea-materia.service';
import { MenuService } from '../../service/menu.service';
import { MateriaService } from 'src/app/dashboard/service/dashboard/materia.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioService } from '../../service/dashboard/usuario.service';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { PlantillaComponent } from '../../src/usuario/estudiantes-profesores/plantilla/plantilla.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { BtnUploadOneFileComponent } from 'src/app/btn-upload-one-file/btn-upload-one-file.component';
import { GoogleMapsComponent } from '../../google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';
import { BootstrapAlertsComponent } from '../../../bootstrap-alerts/bootstrap-alerts.component';
import { LoginComponent } from 'src/app/dashboard/src/login/login.component';
import { LoadingModule } from 'src/app/loading/loading.module';
import { ConfiguracionService } from 'src/app/dashboard/service/dashboard/configuracion.service';
import { SedeService } from 'src/app/dashboard/service/dashboard/sede.service';
import { PlantillaDashboardComponent } from '../../src/pantallas-base/plantilla/plantilla-dashboard.component';
import { NavbarComponent } from '../../src/pantallas-base/navbar/navbar.component';
import { MenuLateralComponent } from '../../src/pantallas-base/menu-lateral/menu-lateral.component';
import { PresentacionDashboardComponent } from '../../src/noticias/presentacion-dashboard/presentacion-dashboard.component';
import { EscuelaService } from 'src/app/dashboard/service/dashboard/escuela.service';
import { PerfilComponent } from '../../src/usuario/estudiantes-profesores/perfil/perfil.component';
import { PlantillaEscuelaUsuarioComponent } from '../../src/usuario/escuelas-estudiantes-profesores/plantilla-escuela-usuario/plantilla-escuela-usuario.component';
import { CrearEscuelaUsuarioComponent } from '../../src/usuario/escuelas-estudiantes-profesores/crear-escuela-estudiante-profesor/crear-escuela-usuario.component';
import { EliminarEscuelaUsuarioComponent } from '../../src/usuario/escuelas-estudiantes-profesores/eliminar-escuela-estudiante-profesor/eliminar-escuela-usuario.component';
import { EliminarUsuarioComponent } from '../../src/usuario/estudiantes-profesores/eliminar/eliminar-usuario.component';
import { ActualizarUsuarioComponent } from '../../src/usuario/estudiantes-profesores/actualizar/actualizar-usuario.component';
import { CrearUsuarioComponent } from '../../src/usuario/estudiantes-profesores/crear/crear-usuario.component';
import { EscuelaUsuarioService } from 'src/app/dashboard/service/dashboard/escuela-usuario.service';
import { AuthGuard } from 'src/app/dashboard/guard/auth/auth.guard';
import { PlantillaCRUDComponent } from '../../src/pantallas-base/plantilla-crud/plantilla-crud.component';
import { PropertiesPlan } from 'src/app/dashboard/properties/properties-plan';
import { PropertiesMateria } from 'src/app/dashboard/properties/properties-materias';
import { PropertiesAsigProfeAsigs } from 'src/app/dashboard/properties/properties-asig-profe-asigs';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SedeComponent } from '../../src/configuracion/sede/crear-sede/sede.component';
import { NombreInstitucionComponent } from '../../src/configuracion/nombre-institucion/nombre-institucion.component';
import { MisionComponent } from '../../src/configuracion/mision/mision.component';
import { VisionComponent } from '../../src/configuracion/vision/vision.component';
import { PlantillaConfiguracionComponent } from '../../src/configuracion/plantilla-configuracion/plantilla-configuracion.component';
import { LogoComponent } from '../../src/configuracion/logo/logo.component';
import { ActualizarSedeComponent } from '../../src/configuracion/sede/actualizar-sede/actualizar-sede.component';
import { EliminarSedeComponent } from '../../src/configuracion/sede/eliminar-sede/eliminar-sede.component';
import { PlantillaSedeComponent } from '../../src/configuracion/sede/plantilla-sede/plantilla-sede.component';
import { EscuelasComponent } from '../../src/configuracion/escuelas/crear/escuelas.component';
import { ActualizarEscuelasComponent } from '../../src/configuracion/escuelas/actualizar-escuelas/actualizar-escuelas.component';
import { EliminarEscuelasComponent } from '../../src/configuracion/escuelas/eliminar-escuelas/eliminar-escuelas.component';
import { PlantillaEscuelasComponent } from '../../src/configuracion/escuelas/plantilla-escuelas/plantilla-escuelas.component';
import { MateriaComponent } from '../../src/configuracion/materias/crear/materia.component';
import { ActualizarMateriasComponent } from '../../src/configuracion/materias/actualizar-materias/actualizar-materias.component';
import { EliminarMateriasComponent } from '../../src/configuracion/materias/eliminar-materias/eliminar-materias.component';
import { PlantillaMateriaComponent } from '../../src/configuracion/materias/plantilla-materia/plantilla-materia.component';
import { SidenavComponent } from '../../src/pantallas-base/sidenav/sidenav.component';
import { LineaMateriasComponent } from '../../src/configuracion/materias/lineas/linea-materias/linea-materias.component';
import { EliminarLineaMateriasComponent } from '../../src/configuracion/materias/lineas/eliminar-linea-materias/eliminar-linea-materias.component';
import { PlantillaLineaMateriasComponent } from '../../src/configuracion/materias/lineas/plantilla-linea-materias/plantilla-linea-materias.component';
import { CrearProgramaComponent } from '../../src/configuracion/programas/crear-programa/crear-programa.component';
import { EliminarProgramaComponent } from '../../src/configuracion/programas/eliminar-programa/eliminar-programa.component';
import { ActualizarProgramaComponent } from '../../src/configuracion/programas/actualizar-programa/actualizar-programa.component';
import { PlantillaProgramaComponent } from '../../src/configuracion/programas/plantilla-programa/plantilla-programa.component';
import { CrearPlanComponent } from '../../src/configuracion/plan/crear-plan/crear-plan.component';
import { ActualizarPlanComponent } from '../../src/configuracion/plan/actualizar-plan/actualizar-plan.component';
import { EliminarPlanComponent } from '../../src/configuracion/plan/eliminar-plan/eliminar-plan.component';
import { PlantillaPlanComponent } from '../../src/configuracion/plan/plantilla-plan/plantilla-plan.component';
import { CrearPlanEstudioComponent } from '../../src/configuracion/plan/plan-estudio/crear-plan-estudio/crear-plan-estudio.component';
import { ActualizarPlanEstudioComponent } from '../../src/configuracion/plan/plan-estudio/actualizar-plan-estudio/actualizar-plan-estudio.component';
import { EliminarPlanEstudioComponent } from '../../src/configuracion/plan/plan-estudio/eliiminar-plan-estudio/eliminar-plan-estudio.component';
import { PlantillaPlanEstudioComponent } from '../../src/configuracion/plan/plan-estudio/plantilla-plan-estudio/plantilla-plan-estudio.component';
import { PlantillaNoticiaComponent } from '../../src/configuracion/noticias/plantilla-noticia/plantilla-noticia.component';
import { CrearNoticiaComponent } from '../../src/configuracion/noticias/crear-noticia/crear-noticia.component';
import { ActualizarNoticiaComponent } from '../../src/configuracion/noticias/actualizar-noticia/actualizar-noticia.component';
import { VerNoticiaComponent } from '../../src/configuracion/noticias/ver-noticia/ver-noticia.component';
import { EliminarNoticiaComponent } from '../../src/configuracion/noticias/eliminar-noticia/eliminar-noticia.component';
import { CrearModalidadComponent } from '../../src/configuracion/modalidades/crear-modalidad/crear-modalidad.component';
import { ActualizarModalidadComponent } from '../../src/configuracion/modalidades/actualizar-modalidad/actualizar-modalidad.component';
import { PlantillaModalidadComponent } from '../../src/configuracion/modalidades/plantilla-modalidad/plantilla-modalidad.component';
import { EliminarModalidadComponent } from '../../src/configuracion/modalidades/eliminar-modalidad/eliminar-modalidad.component';
import { CrearProgramaModalidadComponent } from '../../src/configuracion/programas/programa-modalidad/crear-programa-modalidad/crear-programa-modalidad.component';
import { ActualizarProgramaModalidadComponent } from '../../src/configuracion/programas/programa-modalidad/actualizar-programa-modalidad/actualizar-programa-modalidad.component';
import { EliminarProgramaModalidadComponent } from '../../src/configuracion/programas/programa-modalidad/eliminar-programa-modalidad/eliminar-programa-modalidad.component';
import { PlantillaProgramaModalidadComponent } from '../../src/configuracion/programas/programa-modalidad/plantilla-programa-modalidad/plantilla-programa-modalidad.component';
import { PlantillaSalonComponent } from '../../src/configuracion/salones/plantilla-salon/plantilla-salon.component';
import { CrearSalonComponent } from '../../src/configuracion/salones/crear-salon/crear-salon.component';
import { ActualizarSalonComponent } from '../../src/configuracion/salones/actualizar-salon/actualizar-salon.component';
import { EliminarSalonComponent } from '../../src/configuracion/salones/eliminar-salon/eliminar-salon.component';
import { CrearAsigProfeAsigsComponent } from '../../src/configuracion/asig-profe-asigs/crear-asig-profe-asigs/crear-asig-profe-asigs.component';
import { ActualizarAsigProfeAsigsComponent } from '../../src/configuracion/asig-profe-asigs/actualizar-asig-profe-asigs/actualizar-asig-profe-asigs.component';
import { EliminarAsigProfeAsigsComponent } from '../../src/configuracion/asig-profe-asigs/eliminar-asig-profe-asigs/eliminar-asig-profe-asigs.component';
import { PlantillaAsigProfeAsigsComponent } from '../../src/configuracion/asig-profe-asigs/plantilla-asig-profe-asigs/plantilla-asig-profe-asigs.component';
import { PlantillaProgramacionHorarioComponent } from '../../src/configuracion/programacion-horarios/plantilla-programacion-horario/plantilla-programacion-horario.component';
import { CrearProgramacionHorarioComponent } from '../../src/configuracion/programacion-horarios/crear-programacion-horario/crear-programacion-horario.component';
import { ActualizarProgramacionHorarioComponent } from '../../src/configuracion/programacion-horarios/actualizar-programacion-horario/actualizar-programacion-horario.component';
import { EliminarProgramacionHorarioComponent } from '../../src/configuracion/programacion-horarios/eliminar-programacion-horario/eliminar-programacion-horario.component';
import { CrearEscuelaProgramaComponent } from '../../src/configuracion/escuelas/escuela-programa/crear-escuela-programa/crear-escuela-programa.component';
import { ActualizarEscuelaProgramaComponent } from '../../src/configuracion/escuelas/escuela-programa/actualizar-escuela-programa/actualizar-escuela-programa.component';
import { EliminarEscuelaProgramaComponent } from '../../src/configuracion/escuelas/escuela-programa/eliminar-escuela-programa/eliminar-escuela-programa.component';
import { PlantillaEscuelaProgramaComponent } from '../../src/configuracion/escuelas/escuela-programa/plantilla-escuela-programa/plantilla-escuela-programa.component';

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
    NgxMaterialTimepickerModule,
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
    PlantillaCRUDComponent,
    CrearPlanEstudioComponent,
    ActualizarPlanEstudioComponent,
    EliminarPlanEstudioComponent,
    PlantillaPlanEstudioComponent,
    PlantillaNoticiaComponent,
    CrearNoticiaComponent,
    ActualizarNoticiaComponent,
    VerNoticiaComponent,
    EliminarNoticiaComponent,
    UploadDragDropComponent,
    CrearModalidadComponent,
    ActualizarModalidadComponent,
    PlantillaModalidadComponent,
    EliminarModalidadComponent,
    CrearProgramaModalidadComponent,
    ActualizarProgramaModalidadComponent,
    EliminarProgramaModalidadComponent,
    PlantillaProgramaModalidadComponent,
    PlantillaSalonComponent,
    CrearSalonComponent,
    ActualizarSalonComponent,
    EliminarSalonComponent,
    CrearAsigProfeAsigsComponent,
    ActualizarAsigProfeAsigsComponent,
    EliminarAsigProfeAsigsComponent,
    PlantillaAsigProfeAsigsComponent,
    PlantillaProgramacionHorarioComponent,
    CrearProgramacionHorarioComponent,
    ActualizarProgramacionHorarioComponent,
    EliminarProgramacionHorarioComponent,
    CrearEscuelaProgramaComponent,
    ActualizarEscuelaProgramaComponent,
    EliminarEscuelaProgramaComponent,
    PlantillaEscuelaProgramaComponent

  ],
  exports: [
  ],

  providers: [
    PropertiesLoginDashboard,
    AuthGuard,
    UsuarioService,
    PropertiesUsuario,
    SedeService,
    PropertiesSede,
    EscuelaService,
    EscuelaUsuarioService,
    PropertiesEscuelaUsuarios,
    PropertiesEscuela,
    ConfiguracionService,
    MateriaService,
    PropertiesMateria,
    MenuService,
    LineaMateriaService,
    PropertiesMateriaLinea,
    ProgramaService,
    PropertiesPrograma,
    PlanService,
    PropertiesPlan,
    PlanEstudioService,
    PropertiesPlanEstudio,
    NoticiaService,
    PropertiesNoticia,
    ModalidadService,
    PropertiesModalidad,
    ProgramaModalidadService,
    PropertiesProgramaModalidad,
    SalonService,
    PropertiesSalon,
    AsigProfeAsigsService,
    PropertiesAsigProfeAsigs,
    ProgramacionHorarioService,
    PropertiesProgramacionHorario,
    EscuelaProgramaService,
    PropertiesEscuelaPrograma
  ]
})
export class DashboardModule { }
