import { PeerServer } from './peer-server';
import { Usuario } from './usuario';
import { PeerClient } from './peer-client';

export class PeerServerEmisorReceptor {

  constructor(
    public emisor ?: Usuario,
    public receptor ?: Usuario,
    public peerServer?: PeerServer,
    public peerClient?: PeerClient
  ) {
  }
}
