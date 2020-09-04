import { Chat } from './inscripcion-asignatura';
export class Room {
  prioridad = 2;
  constructor(
    public id?: string,
    public usuarios?: {},
    public chat?: Chat[],
    public ppts?: {},
    public peerServerEmisorReceptor?: {},
    public peerServerEmisorReceptorDesktop?: {},
    public peerRecord?: {}
  ) {

  }
}
