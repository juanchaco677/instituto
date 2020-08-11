import { Escuela } from './escuela';
import { Usuario } from './usuario';
import { Programa } from './programa';

export class EscuelaUsuario {

  constructor(
    public usuario?: Usuario,
    public escuela?: Escuela,
    public programa?: Programa,
    public anio_vigencia_inicial?: number,
    public anio_vigencia_final?: number,
    public created_at?: string,
    public updated_at?: string
  ) {}

}
