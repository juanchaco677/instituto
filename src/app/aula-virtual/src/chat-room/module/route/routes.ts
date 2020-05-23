import { ListRoomComponent } from './../../list-room/list-room.component';
import { LoginChatRoomComponent } from './../../login-chat-room/login-chat-room.component';
import { RoomGuard } from 'src/app/aula-virtual/guard/room.guard';
import { ChatRoomComponent } from '../../chat-room/chat-room.component';

export const routes = [
  {
    path: 'login-room',
    component: LoginChatRoomComponent,
  },
  {
    path: 'list-room',
    component: ListRoomComponent,
    canActivate: [RoomGuard],
    data: {
      rol: ['PR' , 'ES']
    },
  },
  {
    path: 'living-room/:compoundKey',
    component: ChatRoomComponent,
  },

  { path: '**', redirectTo: 'list-room' }
];
