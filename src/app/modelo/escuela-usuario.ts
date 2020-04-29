import { Escuela } from './escuela';
import { Usuario } from './usuario';

export class EscuelaUsuario {

  constructor(
    public usuario?: Usuario,
    public escuela?: Escuela,
    public created_at?: string,
    public updated_at?: string
  ) {}

}
