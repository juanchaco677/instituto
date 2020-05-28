import { ProgramacionHorario } from 'src/app/dashboard/modelo/programacion-horario';
import { Localizacion } from 'src/app/dashboard/modelo/localizacion';
import { Rol } from './../../dashboard/modelo/rol';
declare var Peer: any;
export class Usuario {
  public camaraAudio: any;
  public escritorio: any;
  constructor(
    public email?: string,
    public password?: string,
    public id?: number,
    public nombre?: string,
    public nombre_uno?: string,
    public nombre_dos?: string,
    public apellido_uno?: string,
    public apellido_dos?: string,
    public tipo?: string,
    public cedula?: string,
    public telefono?: string,
    public celular?: string,
    public fechanacimiento?: string,
    public foto?: string,
    public sex?: string,
    public created_at?: string,
    public updated_at?: string,
    public token?: string,
    public localizacion?: Localizacion,
    public rol?: Rol,
    public roles?: Rol[],
    public programaciones?: ProgramacionHorario,
    public audio?: boolean,
    public video?: boolean,
    public stopVideoAudio?: boolean,
    public desktop?: boolean,
    public stopDesktop?: boolean
  ) {
    this.camaraAudio = new Peer();
    this.escritorio = new Peer();
  }
}
