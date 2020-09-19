import { Salon } from './salon';
import { Materia } from './materia';
import { Plan } from './plan';
import { Usuario } from './usuario';
import { ProgramacionHorario } from './programacion-horario';
import { AsigProfeAsigs } from './asig-profe-asigs';
import { Programa } from './programa';
export class ProgramacionHorarioEstudiante {
  constructor(
    public id: number = 0,
    public estudiante: Usuario = new Usuario(),
    public programacion_horario: ProgramacionHorario = new ProgramacionHorario(
      new AsigProfeAsigs(
        new Programa(),
        new Plan(),
        new Materia(),
        new Usuario()
      )
    ),
    public created_at?: string,
    public updated_at?: string
  ) {}
}
