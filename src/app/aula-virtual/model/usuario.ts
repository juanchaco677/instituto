import { Rol } from './../../dashboard/modelo/rol';
declare var Peer: any;
export class Usuario {
  public camaraAudio: any;
  public escritorio: any;
  constructor(
    public id?: number,
    public nombre?: string,
    public cedula?: string,
    public audio?: boolean,
    public video?: boolean,
    public desktop?: boolean,
    public rol?: Rol
  ) {
    this.camaraAudio = new Peer();
    this.escritorio = new Peer();
  }
}
