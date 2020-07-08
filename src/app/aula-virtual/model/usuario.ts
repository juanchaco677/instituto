import { PeerServer } from './peer-server';
import { PeerClient } from './peer-client';
import { ProgramacionHorario } from 'src/app/dashboard/modelo/programacion-horario';
import { Rol } from './../../dashboard/modelo/rol';

export class Usuario {

  constructor(
    public email?: string,
    public id?: number,
    public nombre?: string,
    public tipo?: string,
    public cedula?: string,
    public foto?: string,
    public sex?: string,
    public rol?: Rol,
    public socket?: any
  ) {
  }
}
