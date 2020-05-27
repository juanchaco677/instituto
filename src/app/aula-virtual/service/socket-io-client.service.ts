import { Chat } from '../model/chat';
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
  $error = this.socket.fromEvent<any>('err');
  $rooms = this.socket.fromEvent<string[]>('rooms');
  $chatRoom = this.socket.fromEvent<Usuario>('chatRoom');
  chat$: BehaviorSubject<Chat[]> = new BehaviorSubject <Chat[]>([]);
  constructor(private socket: Socket) { }

  entrarCrearRoom(room: Room){
    this.socket.emit('entrarCrearRoom', room);
  }

  emit(key: string, data: any){
    this.socket.emit(key, data);
  }

  getChat$(){
    return this.chat$.asObservable();
  }

  addChat$(chat: Chat){
    this.chat$.getValue().push(chat);
    this.chat$.next(this.chat$.getValue());
  }

}
