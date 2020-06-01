import { Usuario } from './../../../model/usuario';

import { SocketIoClientService } from './../../../service/socket-io-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-video',
  templateUrl: './list-video.component.html',
  styleUrls: ['./list-video.component.css']
})
export class ListVideoComponent implements OnInit {
  usuarios: Usuario[] = [];
  constructor(
    private socket: SocketIoClientService
  ) { }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  consultarUsuarios() {
    this.socket.getRoom$().subscribe(
      data => {
        this.usuarios = data.usuarios;
        // this.eliminar();
      }
    );
  }

  eliminar() {
    for (const item in this.usuarios) {
      if (this.usuarios[item].tipo === 'PR') {
        this.usuarios.splice(+item, 1);
      }
    }
  }
}
