import { PlantillaPrincipalComponent } from './../../src/pantalla-base/plantilla-principal/plantilla-principal.component';
import { RoomGuard } from '../../guard/room.guard';
import { LoginChatRoomComponent } from '../../src/chat-room/login-chat-room/login-chat-room.component';
import { ListRoomComponent } from '../../src/chat-room/list-room/list-room.component';
import { ChatRoomComponent } from '../../src/chat-room/chat-room/chat-room.component';
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
    component: ChatRoomComponent,
  },
  {
    path: 'login-aula-virtual',
    component: LoginChatRoomComponent,
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
