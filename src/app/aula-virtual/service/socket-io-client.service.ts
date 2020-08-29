import { VideoBoton } from './../model/video-boton';
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
  $addUsuario = this.socket.fromEvent<any>('addUsuario');
  $currentRoom = this.socket.fromEvent<Room>('room');
  $chatRoom = this.socket.fromEvent<Usuario>('chatRoom');
  $createAnswer = this.socket.fromEvent<any>('createAnswer');
  $sendAnswer = this.socket.fromEvent<any>('sendAnswer');
  $refreshUsuario = this.socket.fromEvent<boolean>('refreshUsuario');
  $addIceCandidate = this.socket.fromEvent<any>('addIceCandidate');
  $archivoPpt = this.socket.fromEvent<any>('archivoPpt');
  $recivePaginationC = this.socket.fromEvent<any>('recibePaginationC');
  $chatMessageC = this.socket.fromEvent<any>('chatMessageC');
  $enviarBotonesC = this.socket.fromEvent<any>('enviarBotonesC');
  $enviarControlesS = this.socket.fromEvent<any>('enviarControlesS');



  /**
   * observables
   */
  room$: BehaviorSubject<Room> = new BehaviorSubject<Room>(new Room());
  usuarios$: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);

  programacion$: BehaviorSubject<ProgramacionHorario> = new BehaviorSubject<ProgramacionHorario>(null);
  listen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  boton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  listeAudio$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  listeVideoBoton$: BehaviorSubject<VideoBoton> = new BehaviorSubject<VideoBoton>(null);

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
    this.room$.getValue().usuarios[usuario.id] = usuario;
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
        for (const key in room.usuarios) {
          if (room.usuarios[key].rol.tipo === 'PR') {
            usuario = room.usuarios[key];
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

  addListenAudio(data: boolean){
    this.listeAudio$.next(data);
  }

  getListenAudio(){
    return this.listeAudio$.asObservable();
  }

  deleteListenAudio(){
    this.listeAudio$.next(null);
  }

  addListenVideoBoton(data: VideoBoton){
    this.listeVideoBoton$.next(data);
  }

  getListenVideoBoton(){
    return this.listeVideoBoton$.asObservable();
  }

  deleteListenVideoBoton(){
    this.listeVideoBoton$.next(null);
  }

}
