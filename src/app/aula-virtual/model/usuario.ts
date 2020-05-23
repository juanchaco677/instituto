import { Rol } from './../../dashboard/modelo/rol';

export class Usuario {
  constructor(
    public id?: number,
    public nombre?: string,
    public cedula?: string,
    public videoAudio?: any,
    public desktop?: any,
    public rol?: Rol
  ) {

  }



}
