import { Materia } from './materia';


export class LineaMateria {
  constructor(
    public materia_origen?: Materia,
    public materia?: Materia,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
