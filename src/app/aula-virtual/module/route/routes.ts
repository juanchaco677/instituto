import { ForoComentariosComponent } from './../../src/menu/foro/foro-comentarios/foro-comentarios.component';
import { ForoMateriaComponent } from './../../src/menu/foro/foro-materia/foro-materia.component';
import { PlantillaForoAulaMateriaComponent } from './../../src/menu/foro/plantilla-foro-aula-materia/plantilla-foro-aula-materia.component';
import { PresentacionClaseComponent } from './../../src/menu/clase/presentacion/presentacion-clase/presentacion-clase.component';
import { GaleriaPresentacionComponent } from './../../src/menu/clase/presentacion/galeria-presentacion/galeria-presentacion.component';
import { GaleriaVideoComponent } from './../../src/menu/clase/video/galeria-video/galeria-video.component';
import { VideosClaseComponent } from '../../src/menu/clase/video/videos-clase/videos-clase.component';
import { ListVideoComponent } from './../../src/chat/list-video/list-video.component';
import { ListRoomComponent } from '../../src/menu/clase/list-room/list-room.component';
import { PlantillaChatComponent } from './../../src/chat/plantilla-chat/plantilla-chat.component';
import { PlantillaPrincipalComponent } from './../../src/pantalla-base/plantilla-principal/plantilla-principal.component';
import { AulaVirtualGuard } from '../../guard/aula-virtual.guard';

export const routes = [
  {
    path: 'aula-virtual/living-room/:id',
    component: PlantillaChatComponent,
  },
  {
    path: 'aula-virtual',
    component: PlantillaPrincipalComponent,
    canActivate: [AulaVirtualGuard],
    data: {
      rol: ['PR', 'ES'],
    },
    children: [
      {
        path: 'list-clases',
        component: ListRoomComponent,
      },
      {
        path: 'list-videos/:data',
        component: VideosClaseComponent,
      },
      {
        path: 'list-presentaciones/:data',
        component: PresentacionClaseComponent,
      },
      {
        path: 'clase-videos/:id',
        component: GaleriaVideoComponent,
      },
      {
        path: 'clase-presentaciones/:id',
        component: GaleriaPresentacionComponent,
      },
      {
        path: 'foro-comentarios/:id',
        component: ForoComentariosComponent,
      },
      {
        path: 'foro-crear-actualizar-eliminar',
        component: PlantillaForoAulaMateriaComponent,
      },
      {
        path: 'foro-clase/:data',
        component: ForoMateriaComponent,
      },
    ],
  },
  {
    path: 'cerrar-sesion-es-pr',
    redirectTo: 'login-aula-virtual',
    pathMatch: 'full',
  },
];
