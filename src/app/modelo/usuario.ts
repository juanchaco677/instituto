import { Rol } from './rol';
import { Localizacion } from './localizacion';

export class Usuario {
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
    public roles?: Rol[]
  ) {

  }



}
