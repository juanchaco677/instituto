import { ProgramacionHorario } from './programacion-horario';
import { Materia } from './materia';
import { Salon } from './salon';
import { Plan } from './plan';
import { Usuario } from './usuario';
import { Programa } from './programa';

export class AsigProfeAsigs {
  constructor(
    public programa: Programa = new Programa(),
    public plan: Plan = new Plan(),
    public materia: Materia = new Materia(),
    public profesor: Usuario = new Usuario(),
    public salon: Salon = new Salon(),
    public id?: number,
    public cupos?: number,
    public grupo?: number,
    public programaciones?: ProgramacionHorario[],
    public created_at?: string,
    public updated_at?: string,
    public periodo?: number
  ) { }
}
