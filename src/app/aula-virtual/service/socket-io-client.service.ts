import { PeerClient } from './../model/peer-client';
import { PeerServer } from './../model/peer-server';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { Room } from '../model/room';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable()
export class SocketIoClientService {
  $addUsuario = this.socket.fromEvent<Usuario>('addUsuario');

  $peerConection = this.socket.fromEvent<any>('peer-conection');
  $streamingCam = this.socket.fromEvent<any>('streaming-cam');
  $currentRoom = this.socket.fromEvent<Room>('room');
  $answer = this.socket.fromEvent<PeerClient>('answer');
  $error = this.socket.fromEvent<any>('err');

  $rooms = this.socket.fromEvent<string[]>('rooms');
  $chatRoom = this.socket.fromEvent<Usuario>('chatRoom');

  room$: BehaviorSubject<Room> = new BehaviorSubject<Room>(new Room());
  peerServer$: BehaviorSubject<PeerServer> = new BehaviorSubject<PeerServer>(null);
  peerClient$: BehaviorSubject<PeerClient> = new BehaviorSubject<PeerClient>(null);

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

  getPeerServer$() {
    return this.peerServer$.asObservable();
  }

  addPeerServer$(peerServer: PeerServer) {
    this.peerServer$.next(peerServer);
  }

  deletePeerServer$() {
    this.peerServer$.next(null);
  }


  getPeerClient$() {
    return this.peerClient$.asObservable();
  }

  addPeerClient$(peerClient: PeerClient) {
    this.peerClient$.next(peerClient);
  }

  deletePeerClient$() {
    this.peerClient$.next(null);
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

}
