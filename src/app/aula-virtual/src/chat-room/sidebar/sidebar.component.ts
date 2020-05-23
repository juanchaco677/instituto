import { Chat } from '../../../model/chat';
import { Component, OnInit } from '@angular/core';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  chats: Chat[];
  constructor(
    private socketService: SocketIoClientService,

  ) {

  }

  ngOnInit(): void {
    this.socketService.getChat$().subscribe(
      data => {
        console.log('recibiendo el mensje');
        console.log(data);
        this.chats = data;
      }
    );
  }
}
