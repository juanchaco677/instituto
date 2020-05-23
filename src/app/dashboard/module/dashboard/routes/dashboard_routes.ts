import { AuthGuard } from 'src/app/dashboard/guard/auth/auth.guard';
import { SidenavComponent } from 'src/app/dashboard/src/pantallas-base/sidenav/sidenav.component';
import { CrearUsuarioComponent } from 'src/app/dashboard/src/usuario/estudiantes-profesores/crear/crear-usuario.component';
import { PresentacionDashboardComponent } from 'src/app/dashboard/src/noticias/presentacion-dashboard/presentacion-dashboard.component';
import { PlantillaConfiguracionComponent } from 'src/app/dashboard/src/configuracion/plantilla-configuracion/plantilla-configuracion.component';
import { PlantillaComponent } from 'src/app/dashboard/src/usuario/estudiantes-profesores/plantilla/plantilla.component';
import { EliminarUsuarioComponent } from 'src/app/dashboard/src/usuario/estudiantes-profesores/eliminar/eliminar-usuario.component';
import { ActualizarUsuarioComponent } from 'src/app/dashboard/src/usuario/estudiantes-profesores/actualizar/actualizar-usuario.component';
import { PlantillaEscuelaUsuarioComponent } from 'src/app/dashboard/src/usuario/escuelas-estudiantes-profesores/plantilla-escuela-usuario/plantilla-escuela-usuario.component';
import { EliminarEscuelaUsuarioComponent } from 'src/app/dashboard/src/usuario/escuelas-estudiantes-profesores/eliminar-escuela-estudiante-profesor/eliminar-escuela-usuario.component';
import { CrearEscuelaUsuarioComponent } from 'src/app/dashboard/src/usuario/escuelas-estudiantes-profesores/crear-escuela-estudiante-profesor/crear-escuela-usuario.component';
import { PlantillaSedeComponent } from 'src/app/dashboard/src/configuracion/sede/plantilla-sede/plantilla-sede.component';
import { EliminarSedeComponent } from 'src/app/dashboard/src/configuracion/sede/eliminar-sede/eliminar-sede.component';
import { SedeComponent } from 'src/app/dashboard/src/configuracion/sede/crear-sede/sede.component';
import { ActualizarSedeComponent } from 'src/app/dashboard/src/configuracion/sede/actualizar-sede/actualizar-sede.component';
import { PlantillaEscuelasComponent } from 'src/app/dashboard/src/configuracion/escuelas/plantilla-escuelas/plantilla-escuelas.component';
import { EliminarEscuelasComponent } from 'src/app/dashboard/src/configuracion/escuelas/eliminar-escuelas/eliminar-escuelas.component';
import { EscuelasComponent } from 'src/app/dashboard/src/configuracion/escuelas/crear/escuelas.component';
import { ActualizarEscuelasComponent } from 'src/app/dashboard/src/configuracion/escuelas/actualizar-escuelas/actualizar-escuelas.component';
import { PlantillaMateriaComponent } from 'src/app/dashboard/src/configuracion/materias/plantilla-materia/plantilla-materia.component';
import { EliminarMateriasComponent } from 'src/app/dashboard/src/configuracion/materias/eliminar-materias/eliminar-materias.component';
import { MateriaComponent } from 'src/app/dashboard/src/configuracion/materias/crear/materia.component';
import { ActualizarMateriasComponent } from 'src/app/dashboard/src/configuracion/materias/actualizar-materias/actualizar-materias.component';
import { PlantillaLineaMateriasComponent } from 'src/app/dashboard/src/configuracion/materias/lineas/plantilla-linea-materias/plantilla-linea-materias.component';
import { EliminarLineaMateriasComponent } from 'src/app/dashboard/src/configuracion/materias/lineas/eliminar-linea-materias/eliminar-linea-materias.component';
import { LineaMateriasComponent } from 'src/app/dashboard/src/configuracion/materias/lineas/linea-materias/linea-materias.component';
import { PlantillaProgramaComponent } from 'src/app/dashboard/src/configuracion/programas/plantilla-programa/plantilla-programa.component';
import { EliminarProgramaComponent } from 'src/app/dashboard/src/configuracion/programas/eliminar-programa/eliminar-programa.component';
import { CrearProgramaComponent } from 'src/app/dashboard/src/configuracion/programas/crear-programa/crear-programa.component';
import { ActualizarProgramaComponent } from 'src/app/dashboard/src/configuracion/programas/actualizar-programa/actualizar-programa.component';
import { PlantillaPlanComponent } from 'src/app/dashboard/src/configuracion/plan/plantilla-plan/plantilla-plan.component';
import { EliminarPlanComponent } from 'src/app/dashboard/src/configuracion/plan/eliminar-plan/eliminar-plan.component';
import { CrearPlanComponent } from 'src/app/dashboard/src/configuracion/plan/crear-plan/crear-plan.component';
import { ActualizarPlanComponent } from 'src/app/dashboard/src/configuracion/plan/actualizar-plan/actualizar-plan.component';
import { PlantillaPlanEstudioComponent } from 'src/app/dashboard/src/configuracion/plan/plan-estudio/plantilla-plan-estudio/plantilla-plan-estudio.component';
import { EliminarPlanEstudioComponent } from 'src/app/dashboard/src/configuracion/plan/plan-estudio/eliiminar-plan-estudio/eliminar-plan-estudio.component';
import { CrearPlanEstudioComponent } from 'src/app/dashboard/src/configuracion/plan/plan-estudio/crear-plan-estudio/crear-plan-estudio.component';
import { ActualizarPlanEstudioComponent } from 'src/app/dashboard/src/configuracion/plan/plan-estudio/actualizar-plan-estudio/actualizar-plan-estudio.component';
import { PlantillaNoticiaComponent } from 'src/app/dashboard/src/configuracion/noticias/plantilla-noticia/plantilla-noticia.component';
import { VerNoticiaComponent } from 'src/app/dashboard/src/configuracion/noticias/ver-noticia/ver-noticia.component';
import { EliminarNoticiaComponent } from 'src/app/dashboard/src/configuracion/noticias/eliminar-noticia/eliminar-noticia.component';
import { CrearNoticiaComponent } from 'src/app/dashboard/src/configuracion/noticias/crear-noticia/crear-noticia.component';
import { ActualizarNoticiaComponent } from 'src/app/dashboard/src/configuracion/noticias/actualizar-noticia/actualizar-noticia.component';
import { PlantillaModalidadComponent } from 'src/app/dashboard/src/configuracion/modalidades/plantilla-modalidad/plantilla-modalidad.component';
import { EliminarModalidadComponent } from 'src/app/dashboard/src/configuracion/modalidades/eliminar-modalidad/eliminar-modalidad.component';
import { CrearModalidadComponent } from 'src/app/dashboard/src/configuracion/modalidades/crear-modalidad/crear-modalidad.component';
import { ActualizarModalidadComponent } from 'src/app/dashboard/src/configuracion/modalidades/actualizar-modalidad/actualizar-modalidad.component';
import { PlantillaProgramaModalidadComponent } from 'src/app/dashboard/src/configuracion/programas/programa-modalidad/plantilla-programa-modalidad/plantilla-programa-modalidad.component';
import { EliminarProgramaModalidadComponent } from 'src/app/dashboard/src/configuracion/programas/programa-modalidad/eliminar-programa-modalidad/eliminar-programa-modalidad.component';
import { CrearProgramaModalidadComponent } from 'src/app/dashboard/src/configuracion/programas/programa-modalidad/crear-programa-modalidad/crear-programa-modalidad.component';
import { PlantillaSalonComponent } from 'src/app/dashboard/src/configuracion/salones/plantilla-salon/plantilla-salon.component';
import { EliminarSalonComponent } from 'src/app/dashboard/src/configuracion/salones/eliminar-salon/eliminar-salon.component';
import { CrearSalonComponent } from 'src/app/dashboard/src/configuracion/salones/crear-salon/crear-salon.component';
import { ActualizarSalonComponent } from 'src/app/dashboard/src/configuracion/salones/actualizar-salon/actualizar-salon.component';
import { PlantillaAsigProfeAsigsComponent } from 'src/app/dashboard/src/configuracion/asig-profe-asigs/plantilla-asig-profe-asigs/plantilla-asig-profe-asigs.component';
import { EliminarAsigProfeAsigsComponent } from 'src/app/dashboard/src/configuracion/asig-profe-asigs/eliminar-asig-profe-asigs/eliminar-asig-profe-asigs.component';
import { CrearAsigProfeAsigsComponent } from 'src/app/dashboard/src/configuracion/asig-profe-asigs/crear-asig-profe-asigs/crear-asig-profe-asigs.component';
import { ActualizarAsigProfeAsigsComponent } from 'src/app/dashboard/src/configuracion/asig-profe-asigs/actualizar-asig-profe-asigs/actualizar-asig-profe-asigs.component';
import { PlantillaProgramacionHorarioComponent } from 'src/app/dashboard/src/configuracion/programacion-horarios/plantilla-programacion-horario/plantilla-programacion-horario.component';
import { EliminarProgramacionHorarioComponent } from 'src/app/dashboard/src/configuracion/programacion-horarios/eliminar-programacion-horario/eliminar-programacion-horario.component';
import { CrearProgramacionHorarioComponent } from 'src/app/dashboard/src/configuracion/programacion-horarios/crear-programacion-horario/crear-programacion-horario.component';
import { ActualizarProgramacionHorarioComponent } from 'src/app/dashboard/src/configuracion/programacion-horarios/actualizar-programacion-horario/actualizar-programacion-horario.component';
import { PlantillaEscuelaProgramaComponent } from 'src/app/dashboard/src/configuracion/escuelas/escuela-programa/plantilla-escuela-programa/plantilla-escuela-programa.component';
import { EliminarEscuelaProgramaComponent } from 'src/app/dashboard/src/configuracion/escuelas/escuela-programa/eliminar-escuela-programa/eliminar-escuela-programa.component';
import { CrearEscuelaProgramaComponent } from 'src/app/dashboard/src/configuracion/escuelas/escuela-programa/crear-escuela-programa/crear-escuela-programa.component';
import { ActualizarEscuelaProgramaComponent } from 'src/app/dashboard/src/configuracion/escuelas/escuela-programa/actualizar-escuela-programa/actualizar-escuela-programa.component';

export const routes = [
  {
    path: 'administrator',
    canActivate: [AuthGuard],
    data: {
      rol: ['AD' , 'SE']
    },
    component: SidenavComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard/perfil-usuario/:tipo',
        component: CrearUsuarioComponent
      },
      {
        path: '',
        component: PresentacionDashboardComponent
      },
      {
        path: 'dashboard/configuracion/general',
        component: PlantillaConfiguracionComponent
      },

      {
        path: 'dashboard/usuario/tipo/:tipo',
        component: PlantillaComponent,
        children: [
          {
            path: 'eliminar-usuario/:tipo',
            component: EliminarUsuarioComponent
          },
          {
            path: 'crear-usuario/:tipo',
            component: CrearUsuarioComponent
          },
          {
            path: 'actualizar-usuario/:tipo',
            component: ActualizarUsuarioComponent,
          },
          {
            path: 'actualizar-usuario/:id/:tipo',
            component: CrearUsuarioComponent,
          },
          {
            path: 'actualizar-perfil/:id/:tipo',
            component: CrearUsuarioComponent
          }
        ]
      },
      {
        path: 'dashboard/usuario/escuela/:tipo',
        component: PlantillaEscuelaUsuarioComponent,
        children: [
          {
            path: 'eliminar-escuela-usuario/:tipo',
            component: EliminarEscuelaUsuarioComponent
          },
          {
            path: 'crear-escuela-usuario/:tipo',
            component: CrearEscuelaUsuarioComponent
          },

        ]
      },
      {
        path: 'dashboard/configuracion/sedes',
        component: PlantillaSedeComponent,
        children: [
          {
            data: {
              rol: ['AD']
            },
            path: 'eliminar-sede',
            component: EliminarSedeComponent
          },
          {
            path: 'crear-sede',
            component: SedeComponent
          },
          {
            path: 'actualizar-sede',
            component: ActualizarSedeComponent,
          },
          {
            path: 'actualizar-sede/:id',
            component: SedeComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/escuelas',
        component: PlantillaEscuelasComponent,
        children: [
          {
            path: 'eliminar-escuela',
            component: EliminarEscuelasComponent
          },
          {
            path: 'crear-escuela',
            component: EscuelasComponent
          },
          {
            path: 'actualizar-escuela',
            component: ActualizarEscuelasComponent,
          },
          {
            path: 'actualizar-escuela/:id',
            component: EscuelasComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/asignatura',
        component: PlantillaMateriaComponent,
        children: [
          {
            path: 'eliminar-asignatura',
            component: EliminarMateriasComponent
          },
          {
            path: 'crear-asignatura',
            component: MateriaComponent
          },
          {
            path: 'actualizar-asignatura',
            component: ActualizarMateriasComponent,
          },
          {
            path: 'actualizar-asignatura/:id',
            component: MateriaComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/linea-asignatura',
        component: PlantillaLineaMateriasComponent,
        children: [
          {
            path: 'eliminar-asignatura',
            component: EliminarLineaMateriasComponent
          },
          {
            path: 'crear-asignatura',
            component: LineaMateriasComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/programa',
        component: PlantillaProgramaComponent,
        children: [
          {
            path: 'eliminar-programa',
            component: EliminarProgramaComponent
          },
          {
            path: 'crear-programa',
            component: CrearProgramaComponent
          },
          {
            path: 'actualizar-programa',
            component: ActualizarProgramaComponent,
          },
          {
            path: 'actualizar-programa/:id',
            component: CrearProgramaComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/plan',
        component: PlantillaPlanComponent,
        children: [
          {
            path: 'eliminar-plan',
            component: EliminarPlanComponent
          },
          {
            path: 'crear-plan',
            component: CrearPlanComponent
          },
          {
            path: 'actualizar-plan',
            component: ActualizarPlanComponent,
          },
          {
            path: 'actualizar-plan/:id',
            component: CrearPlanComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/plan-estudio',
        component: PlantillaPlanEstudioComponent,
        children: [
          {
            path: 'eliminar-plan-estudio',
            component: EliminarPlanEstudioComponent
          },
          {
            path: 'crear-plan-estudio',
            component: CrearPlanEstudioComponent
          },
          {
            path: 'actualizar-plan-estudio',
            component: ActualizarPlanEstudioComponent,
          },
          {
            path: 'actualizar-plan-estudio/:compoundKey',
            component: CrearPlanEstudioComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/noticia',
        component: PlantillaNoticiaComponent,
        children: [
          {
            path: 'ver-noticia',
            component: VerNoticiaComponent
          },
          {
            path: 'eliminar-noticia',
            component: EliminarNoticiaComponent
          },
          {
            path: 'crear-noticia',
            component: CrearNoticiaComponent
          },
          {
            path: 'actualizar-noticia',
            component: ActualizarNoticiaComponent,
          },
          {
            path: 'actualizar-noticia/:id',
            component: CrearNoticiaComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/modalidad',
        component: PlantillaModalidadComponent,
        children: [
          {
            path: 'eliminar-modalidad',
            component: EliminarModalidadComponent
          },
          {
            path: 'crear-modalidad',
            component: CrearModalidadComponent
          },
          {
            path: 'actualizar-modalidad',
            component: ActualizarModalidadComponent,
          },
          {
            path: 'actualizar-modalidad/:id',
            component: CrearModalidadComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/programa-modalidad',
        component: PlantillaProgramaModalidadComponent,
        children: [
          {
            path: 'eliminar-programa-modalidad',
            component: EliminarProgramaModalidadComponent
          },
          {
            path: 'crear-programa-modalidad',
            component: CrearProgramaModalidadComponent
          },
        ]
      },
      {
        path: 'dashboard/configuracion/salon',
        component: PlantillaSalonComponent,
        children: [
          {
            path: 'eliminar-salon',
            component: EliminarSalonComponent
          },
          {
            path: 'crear-salon',
            component: CrearSalonComponent
          },
          {
            path: 'actualizar-salon',
            component: ActualizarSalonComponent,
          },
          {
            path: 'actualizar-salon/:id',
            component: CrearSalonComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/asig-profe-asigs',
        component: PlantillaAsigProfeAsigsComponent,
        children: [
          {
            path: 'eliminar-asig-profe-asigs',
            component: EliminarAsigProfeAsigsComponent
          },
          {
            path: 'crear-asig-profe-asigs',
            component: CrearAsigProfeAsigsComponent
          },
          {
            path: 'actualizar-asig-profe-asigs',
            component: ActualizarAsigProfeAsigsComponent,
          },
          {
            path: 'actualizar-asig-profe-asigs/:id',
            component: CrearAsigProfeAsigsComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/programacion-horario',
        component: PlantillaProgramacionHorarioComponent,
        children: [
          {
            path: 'eliminar-programacion-horario',
            component: EliminarProgramacionHorarioComponent
          },
          {
            path: 'crear-programacion-horario',
            component: CrearProgramacionHorarioComponent
          },
          {
            path: 'actualizar-programacion-horario',
            component: ActualizarProgramacionHorarioComponent,
          },
          {
            path: 'actualizar-programacion-horario/:id',
            component: CrearProgramacionHorarioComponent
          }
        ]
      },
      {
        path: 'dashboard/configuracion/escuela-programa',
        component: PlantillaEscuelaProgramaComponent,
        children: [
          {
            path: 'eliminar-escuela-programa',
            component: EliminarEscuelaProgramaComponent
          },
          {
            path: 'crear-escuela-programa',
            component: CrearEscuelaProgramaComponent
          },
          {
            path: 'actualizar-escuela-programa',
            component: ActualizarEscuelaProgramaComponent,
          },
          {
            path: 'actualizar-escuela-programa/:compoundKey',
            component: CrearEscuelaProgramaComponent
          }
        ]
      },
    ]
  },

  { path: 'cerrar-sesion', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' }
];
