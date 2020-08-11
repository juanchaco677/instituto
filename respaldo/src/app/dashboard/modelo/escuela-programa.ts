import { Escuela } from './escuela';
import { Programa } from './programa';

export class EscuelaPrograma {

  constructor(
    public escuela?: Escuela,
    public programa?: Programa,
    public anio_vigencia_inicial?: number,
    public anio_vigencia_final?: number,
    public created_at?: string,
    public updated_at?: string,
    public compoundKeyData?: string
  ) {}

}
