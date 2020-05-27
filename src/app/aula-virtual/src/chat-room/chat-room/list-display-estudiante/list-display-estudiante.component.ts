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
  ) { }

  ngOnInit(): void {
    this.socket.$addUsuario.subscribe(
      data => this.estudiantes.push(data)
    );
  }

}
