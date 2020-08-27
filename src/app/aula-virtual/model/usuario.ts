import { Rol } from './../../dashboard/modelo/rol';

export class Usuario {

  constructor(
    public email?: string,
    public id?: number,
    public nombre?: string,
    // tslint:disable-next-line: variable-name
    public nombre_uno?: string,
    // tslint:disable-next-line: variable-name
    public nombre_dos?: string,
    // tslint:disable-next-line: variable-name
    public apellido_uno?: string,
    // tslint:disable-next-line: variable-name
    public apellido_dos?: string,
    public tipo?: string,
    public cedula?: string,
    public foto?: string,
    public sex?: string,
    public rol?: Rol,
    public socket?: any,
    public color?: string
  ) {
  }
}
