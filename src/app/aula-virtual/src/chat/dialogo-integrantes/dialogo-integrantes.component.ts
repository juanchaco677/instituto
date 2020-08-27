import { Sesion } from './../../../../utils/sesion';
import { Util } from './../../../../utils/util';
import { Room } from './../../../model/room';
import { Usuario } from './../../../model/usuario';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-dialogo-integrantes',
  templateUrl: './dialogo-integrantes.component.html',
  styleUrls: ['./dialogo-integrantes.component.css'],
})
export class DialogoIntegrantesComponent implements OnInit {
  @Output() out = new EventEmitter<any>();
  integrantes = {};
  usuarios = {};
  formulario: any;
  nombre = '';
  room: Room;
  usuario: Usuario;
  todos = false;
  constructor() {
    this.usuario = Sesion.userAulaChat();
    this.integrantes[this.usuario.id] = this.usuario;
  }

  ngOnInit(): void {}

  cancelar() {
    this.out.emit({ opcion: 1, integrantes: null, todos: false });
  }

  enviar() {
    this.out.emit({ opcion: 2, integrantes: this.integrantes, todos: this.todos });
  }

  entrada(event: any) {
    if (!Util.empty(this.nombre)) {
      this.usuarios = {};
      for (const key in this.room.usuarios) {
        if (
          this.room.usuarios[key].nombre.toLowerCase().indexOf(this.nombre.toLowerCase()) !==
            -1 &&
          this.room.usuarios[key].id !== this.room.usuarios[key].id
        ) {
          this.usuarios[this.room.usuarios[key].id] = this.room.usuarios[key];
        }
      }
    } else {
      this.usuarios = {};
    }
  }

  selectRow(key: any) {
    this.integrantes[key] = this.usuarios[key];
    this.usuarios = {};
  }

  remove(key: any) {
    delete this.integrantes[key];
  }
}
