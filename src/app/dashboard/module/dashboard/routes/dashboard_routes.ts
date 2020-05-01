import { ActualizarPlanComponent } from './../../../configuracion/plan/actualizar-plan/actualizar-plan.component';
import { CrearPlanComponent } from './../../../configuracion/plan/crear-plan/crear-plan.component';
import { EliminarPlanComponent } from './../../../configuracion/plan/eliminar-plan/eliminar-plan.component';
import { PlantillaPlanComponent } from './../../../configuracion/plan/plantilla-plan/plantilla-plan.component';
import { PlantillaProgramaComponent } from './../../../configuracion/programas/plantilla-programa/plantilla-programa.component';
import { EliminarProgramaComponent } from './../../../configuracion/programas/eliminar-programa/eliminar-programa.component';
import { ActualizarProgramaComponent } from './../../../configuracion/programas/actualizar-programa/actualizar-programa.component';
import { CrearProgramaComponent } from './../../../configuracion/programas/crear-programa/crear-programa.component';
import { LineaMateriasComponent } from './../../../configuracion/materias/lineas/linea-materias/linea-materias.component';
import { EliminarLineaMateriasComponent } from './../../../configuracion/materias/lineas/eliminar-linea-materias/eliminar-linea-materias.component';
import { PlantillaLineaMateriasComponent } from './../../../configuracion/materias/lineas/plantilla-linea-materias/plantilla-linea-materias.component';
import { PlantillaComponent } from '../../../usuario/estudiantes-profesores/plantilla/plantilla.component';
import { PlantillaConfiguracionComponent } from 'src/app/dashboard/configuracion/plantilla-configuracion/plantilla-configuracion.component';
import { PresentacionDashboardComponent } from 'src/app/dashboard/noticias/presentacion-dashboard/presentacion-dashboard.component';
import { PlantillaSedeComponent } from 'src/app/dashboard/configuracion/sede/plantilla-sede/plantilla-sede.component';
import { EliminarSedeComponent } from 'src/app/dashboard/configuracion/sede/eliminar-sede/eliminar-sede.component';
import { SedeComponent } from 'src/app/dashboard/configuracion/sede/crear-sede/sede.component';
import { ActualizarSedeComponent } from 'src/app/dashboard/configuracion/sede/actualizar-sede/actualizar-sede.component';
import { PlantillaDashboardComponent } from 'src/app/dashboard/pantallas-base/plantilla/plantilla-dashboard.component';
import { PlantillaEscuelasComponent } from 'src/app/dashboard/configuracion/escuelas/plantilla-escuelas/plantilla-escuelas.component';
import { EliminarEscuelasComponent } from 'src/app/dashboard/configuracion/escuelas/eliminar-escuelas/eliminar-escuelas.component';
import { ActualizarEscuelasComponent } from 'src/app/dashboard/configuracion/escuelas/actualizar-escuelas/actualizar-escuelas.component';
import { EscuelasComponent } from 'src/app/dashboard/configuracion/escuelas/crear/escuelas.component';
import { PlantillaEscuelaUsuarioComponent } from 'src/app/dashboard/usuario/escuelas-estudiantes-profesores/plantilla-escuela-usuario/plantilla-escuela-usuario.component';
import { EliminarEscuelaUsuarioComponent } from 'src/app/dashboard/usuario/escuelas-estudiantes-profesores/eliminar-escuela-estudiante-profesor/eliminar-escuela-usuario.component';
import { CrearEscuelaUsuarioComponent } from 'src/app/dashboard/usuario/escuelas-estudiantes-profesores/crear-escuela-estudiante-profesor/crear-escuela-usuario.component';
import { ActualizarUsuarioComponent } from 'src/app/dashboard/usuario/estudiantes-profesores/actualizar/actualizar-usuario.component';
import { EliminarUsuarioComponent } from 'src/app/dashboard/usuario/estudiantes-profesores/eliminar/eliminar-usuario.component';
import { CrearUsuarioComponent } from 'src/app/dashboard/usuario/estudiantes-profesores/crear/crear-usuario.component';
import { AuthGuard } from 'src/app/guard/auth/auth.guard';
import { PlantillaMateriaComponent } from 'src/app/dashboard/configuracion/materias/plantilla-materia/plantilla-materia.component';
import { EliminarMateriasComponent } from 'src/app/dashboard/configuracion/materias/eliminar-materias/eliminar-materias.component';
import { ActualizarMateriasComponent } from 'src/app/dashboard/configuracion/materias/actualizar-materias/actualizar-materias.component';
import { SidenavComponent } from 'src/app/dashboard/pantallas-base/sidenav/sidenav.component';
import { MateriaComponent } from 'src/app/dashboard/configuracion/materias/crear/materia.component';

export const routes = [
  {
    path: 'administrator',
    canActivate: [AuthGuard],
    component: SidenavComponent,
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
        path: 'dashboard/usuario/:tipo',
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
    ]
  },

  { path: 'cerrar-sesion', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' }
];
