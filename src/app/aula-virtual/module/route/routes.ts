import { RoomGuard } from '../../guard/room.guard';
import { LoginChatRoomComponent } from '../../src/chat-room/login-chat-room/login-chat-room.component';
import { ListRoomComponent } from '../../src/chat-room/list-room/list-room.component';
import { ChatRoomComponent } from '../../src/chat-room/chat-room/chat-room.component';

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

  // { path: '**', redirectTo: 'list-room' }
];
