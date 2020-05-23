import { Modalidad } from './modalidad';
import { Programa } from './programa';
export class ProgramaModalidad {
  constructor(
    public programa?: Programa,
    public modalidad?: Modalidad,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
