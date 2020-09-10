import { Room } from './../../../model/room';
import { Util } from './../../../../utils/util';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-mp4',
  templateUrl: './list-mp4.component.html',
  styleUrls: ['./list-mp4.component.css'],
})
export class ListMp4Component implements OnInit {
  room = new Room(null, {}, [], {}, {}, {}, {}, {});
  constructor(private socket: SocketIoClientService) {}

  ngOnInit(): void {
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
      }
    });
    this.socket.$archivosBibliotecaC.subscribe((data) => {
      if (!Util.empty(data) && data.biblioteca.extension === 'mp4') {
        this.room.videos[data.biblioteca.id] = data.biblioteca;
      }
    });
  }
}
