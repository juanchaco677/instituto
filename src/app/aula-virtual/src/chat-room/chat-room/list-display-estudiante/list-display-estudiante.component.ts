import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-display-estudiante',
  templateUrl: './list-display-estudiante.component.html',
  styleUrls: ['./list-display-estudiante.component.css']
})
export class ListDisplayEstudianteComponent implements OnInit {
  estudiantes: Usuario[] = [];
  constructor(
    private socket: SocketIoClientService
  ) {
    this.consultarUsuarios();
  }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  consultarUsuarios() {
    this.socket.getRoom$().subscribe(data => {
      console.log('ingreso aqui');
      this.estudiantes = data.usuarios;
    });
  }

}
