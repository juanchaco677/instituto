import { ProgramacionHorario } from './programacion-horario';
import { Usuario } from './usuario';
export class IncripcionAsigEs {
  constructor(
    public estudiante?: Usuario,
    public programacion?: ProgramacionHorario,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
