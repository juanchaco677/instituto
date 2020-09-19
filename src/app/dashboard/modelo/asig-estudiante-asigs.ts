import { Salon } from './salon';
import { Materia } from './materia';
import { Plan } from './plan';
import { Usuario } from './usuario';
import { Programa } from './programa';

export class AsigEstudianteAsigs {
  constructor(
    public id?: number,
    public estudiante: Usuario = new Usuario(),
    public programa: Programa = new Programa(),
    public materia: Materia = new Materia(),
    public plan: Plan = new Plan(),
    public periodo: number = 1,
    public ano_gravable: number = new Date().getFullYear(),
    public created_at?: string,
    public updated_at?: string
  ) {}
}
