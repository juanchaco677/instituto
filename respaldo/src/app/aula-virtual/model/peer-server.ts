import { Injectable } from '@angular/core';
import { SocketIoClientService } from './../service/socket-io-client.service';

import { Usuario } from './usuario';
declare var SimplePeer: any;
@Injectable()
export class PeerServer {
  config = {
    iceServers: [
      {
        urls: 'stun:181.55.192.137:3478',
        username: 'cony',
        password: 'juancamilo65',
      },
    ],
    sdpSemantics: 'unified-plan',
  };
  peerConnection: any;
  data: any;
  gotAnswer = true;
  constructor(public socket?: SocketIoClientService) {
    this.peerConnection = new SimplePeer({
      initiator: true,
      config: this.config,
    });
  }


  sendDataPeer(
    data: any,
    id: string,
    key: string,
    camDesktop: boolean,
    usuarioOrigen: Usuario,
    usuarioDestino: Usuario
  ) {
    console.log('..FUNCIÓN CREATE OFFER..');
    console.log('ORIGEN..'+usuarioOrigen.id+' DESTINO..'+usuarioDestino.id);
    console.log(key);
    console.log(data);
    this.data = data;
    this.socket.emit('createAnswer', {
      data,
      id,
      key,
      camDesktop,
      usuarioOrigen,
      usuarioDestino,
    });
  }

  sendData(data: any) {
      this.peerConnection.send(data);
  }

  addSignal(data: any) {
    this.peerConnection.signal(data);
  }
}
