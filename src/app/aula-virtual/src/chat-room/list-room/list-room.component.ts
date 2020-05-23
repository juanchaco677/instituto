import { Sesion } from '../../../../utils/sesion';
import { Room } from '../../../model/room';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {
  room: Room[];
  tipo: string;

  constructor(
    private socketService: SocketIoClientService,
    private router: Router
    ) {

      this.tipo = Sesion.user().rol.tipo;
     }

  ngOnInit(): void {

  }

  livingRoom(parameter){
    this.router.navigate(['../living-room', parameter]);

  }

}
