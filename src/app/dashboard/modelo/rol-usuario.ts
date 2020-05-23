import { Rol } from './rol';
import { Usuario } from './usuario';
export class RolUsuario {
  constructor(
    public usuario: Usuario,
    public rol: Rol,
    public created_at: string,
    public updated_at: string
  ) {}
}
