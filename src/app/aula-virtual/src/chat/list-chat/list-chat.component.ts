import { Room } from './../../../model/room';
import { Util } from 'src/app/utils/util';
import { Chat } from './../../../model/chat';
import { Sesion } from './../../../../utils/sesion';
import { SocketIoClientService } from './../../../service/socket-io-client.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css'],
})
export class ListChatComponent implements OnInit {
  room = new Room(null, {}, [], {}, {}, {});
  chat: Chat;
  mensaje = '';
  @Input() width: string;
  constructor(private socket: SocketIoClientService) {
    this.chat = new Chat(Sesion.userAulaChat());
  }

  ngOnInit(): void {
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
      }
    });
    this.socket.$chatMessageC.subscribe((data) => this.listenChat(data));
  }

  listenChat(data: any) {
    if (!Util.empty(data)) {
      console.log('ver chat');
      console.log(this.room.chat);
      this.room.chat.unshift(data.chat);
    }
  }

  onKeyDown() {
    if (!Util.empty(this.mensaje)) {
      this.chat.hora = new Date();
      this.chat.mensaje = this.mensaje;
      this.socket.emit('chatMessageS', { id: this.room.id, chat: this.chat });
      this.mensaje = '';
    }
  }
}
