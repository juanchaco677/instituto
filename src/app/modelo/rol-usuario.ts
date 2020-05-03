import { Usuario } from 'src/app/modelo/usuario';
import { Rol } from './rol';
export class RolUsuario {
  constructor(
    public usuario: Usuario,
    public rol: Rol,
    public created_at: string,
    public updated_at: string
  ) {}
}
