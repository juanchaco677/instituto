import { Chat } from './../../../model/chat';
import { Sesion } from './../../../../utils/sesion';
import { SocketIoClientService } from './../../../service/socket-io-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css']
})
export class ListChatComponent implements OnInit {
  chat: Chat[] = [];
  constructor(
    private socket: SocketIoClientService
  ) { }

  ngOnInit(): void {
    this.consultarChat();
  }

  consultarChat(){
    this.socket.getRoom$().subscribe(
      data => {
        this.chat = data.chat;
      }
    );
  }

}
