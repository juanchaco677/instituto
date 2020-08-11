import { PeerServerEmisorReceptor } from './peer-server-emisor-receptor';
import { Usuario } from './usuario';
export class Room {
  constructor(
    public id?: string,
    public usuarios?: Usuario[],
    public chat?: [],
    public peerServerEmisorReceptor?: {},
    public peerServerEmisorReceptorDesktop?: {},
  ) {

  }
}
