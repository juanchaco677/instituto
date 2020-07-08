import { ProgramacionHorario } from './../../dashboard/modelo/programacion-horario';
import { PeerServerEmisorReceptor } from './../model/peer-server-emisor-receptor';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { Room } from '../model/room';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable()
export class SocketIoClientService {
  /**
   * hilos de escucha socket io
   */
  $addUsuario = this.socket.fromEvent<Usuario>('addUsuario');
  $currentRoom = this.socket.fromEvent<Room>('room');
  $chatRoom = this.socket.fromEvent<Usuario>('chatRoom');
  $reciveTransmision = this.socket.fromEvent<Usuario>('reciveTransmision');
  $createAnswer = this.socket.fromEvent<PeerServerEmisorReceptor[]>('createAnswer');
  $sendAnswer = this.socket.fromEvent<PeerServerEmisorReceptor[]>('sendAnswer');
  /**
   * observables
   */
  room$: BehaviorSubject<Room> = new BehaviorSubject<Room>(new Room());
  usuarios$: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);

  programacion$: BehaviorSubject<ProgramacionHorario> = new BehaviorSubject<ProgramacionHorario>(null);
  listen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  boton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private socket: Socket) { }

  emit(key: string, data: any) {
    this.socket.emit(key, data);
  }

  getRoom$() {
    return this.room$.asObservable();
  }

  addRoom$(room: Room) {
    this.room$.next(room);
  }

  addRoomEmisorReceptor(peerEmisorReceptor: PeerServerEmisorReceptor){
    this.room$.getValue().peerServerEmisorReceptor.push(peerEmisorReceptor);
  }

  deleteRoomElementUsuario$(usuario: Usuario) {

    for (const [index , element] of this.room$.getValue().usuarios.entries()) {
      if (element.id === usuario.id) {
        this.room$.getValue().usuarios.splice(index, 1);
      }
    }
    this.room$.getValue().usuarios.push(usuario);
  }

  deleteRoom$() {
    this.room$.next(null);
  }

  getUsuarios$() {
    return this.usuarios$.asObservable();
  }

  addAllUsuarios$(usuario: Usuario[]) {
    this.usuarios$.next(usuario);
  }

  addUsuario$(usuario: Usuario) {
    this.room$.getValue().usuarios.push(usuario);
  }

  deleteUsuarios$() {
    this.usuarios$.next(null);
  }

  addProgramacion$(programacion: ProgramacionHorario){
    this.programacion$.next(programacion);
  }

  getProgramacion$(){
    return this.programacion$.asObservable();
  }

  deleteProgramacion(){
    this.programacion$.next(null);
  }

  buscarProfesor() {
    let usuario: Usuario = null;
    this.getRoom$().subscribe(
      room => {
        for (const user of room.usuarios) {
          if (user.rol.tipo === 'PR') {
            usuario = user;
            return usuario;
          }
        }
      }
    );
    return usuario;
  }

  addListen(data: boolean){
    this.listen$.next(data);
  }

  getListen(){
    return this.listen$.asObservable();
  }

  deleteListen(){
    this.listen$.next(null);
  }
}
