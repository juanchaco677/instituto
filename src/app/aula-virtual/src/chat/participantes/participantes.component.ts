import { Sesion } from './../../../../utils/sesion';
import { VideoBoton } from './../../../model/video-boton';
import { Usuario } from './../../../model/usuario';
import { Util } from 'src/app/utils/util';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Room } from './../../../model/room';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css'],
})
export class ParticipantesComponent implements OnInit {
  room = new Room(null, {}, [], {}, {}, {});
  usuario: Usuario;
  constructor(private socket: SocketIoClientService) {
    this.usuario = Sesion.userAulaChat();
  }

  ngOnInit(): void {
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
        console.log('room mas adentro');
        console.log(this.room);
      }
    });
    this.socket.$enviarBotonesC.subscribe((data) => this.listenBotones(data));
  }

  listenBotones(data: any) {
    console.log('recibiendo informacion.............');
    console.log(data);
    if (!Util.empty(data)) {
      this.room.usuarios[data.usuario.id] = data.usuario;
      this.socket.addRoom$(this.room);
    }
  }

  opcion(key: any, op: number) {
    const boton: VideoBoton = this.room.usuarios[key].boton;
    if (this.usuario.rol.tipo === 'PR') {
      console.log('para enviar');
      let enviar = false;
      if (boton.video) {
        enviar = true;
      } else if (boton.audio) {
        enviar = true;
      } else if (boton.mano) {
        enviar = true;
      }
      console.log(enviar);
      console.log(this.room);
      console.log(this.room.usuarios[key]);
      if (enviar) {
        this.socket.emit('recibirControlesS', {
          id: this.room.id,
          usuario: this.room.usuarios[key],
          opcion: op,
        });
      }
    }
  }
}
