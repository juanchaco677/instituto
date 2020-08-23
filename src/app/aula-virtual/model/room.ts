import { PeerServerEmisorReceptor } from './peer-server-emisor-receptor';
import { Usuario } from './usuario';
export class Room {
  prioridad = 2;
  constructor(
    public id?: string,
    public usuarios?: Usuario[],
    public chat?: [],
    public ppts?: {},
    public peerServerEmisorReceptor?: {},
    public peerServerEmisorReceptorDesktop?: {},
  ) {

  }
}
