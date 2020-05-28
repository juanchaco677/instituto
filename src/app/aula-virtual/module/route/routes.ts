import { ListRoomComponent } from '../../src/menu/list-room/list-room.component';
import { LoginAulaVirtualComponent } from './../../src/pantalla-base/login-aula-virtual/login-aula-virtual.component';
import { PlantillaChatComponent } from './../../src/chat/plantilla-chat/plantilla-chat.component';
import { PlantillaPrincipalComponent } from './../../src/pantalla-base/plantilla-principal/plantilla-principal.component';
import { AulaVirtualGuard } from '../../guard/aula-virtual.guard';

export const routes = [
  // {
  //   path: 'login-room',
  //   component: LoginChatRoomComponent,
  // },
  // {
  //   path: 'list-room',
  //   component: ListRoomComponent,
  //   canActivate: [RoomGuard],
  //   data: {
  //     rol: ['PR', 'ES']
  //   },
  // },
  {
    path: 'aula-virtual/living-room/:compoundKey',
    component: PlantillaChatComponent,
  },
  {
    path: 'login-aula-virtual',
    component: LoginAulaVirtualComponent,
  },
  {
    path: 'aula-virtual',
    component: PlantillaPrincipalComponent,
    canActivate: [AulaVirtualGuard],
    data: {
      rol: ['PR', 'ES']
    },
    children: [
      {
        path: 'list-clases',
        component: ListRoomComponent,
      },
    ]
  },
  { path: 'cerrar-sesion-es-pr', redirectTo: 'login-aula-virtual', pathMatch: 'full' },
];
