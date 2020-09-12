import { Sede } from './sede';
import { Escuela } from './escuela';
import { Plan } from './plan';
import { Usuario } from './usuario';
import { Programa } from './programa';

export class Matricula {
  constructor(
    public id?: number,
    public escuela: Escuela = new Escuela(),
    public programa: Programa = new Programa(),
    public estudiante: Usuario = new Usuario(),
    public sede: Sede = new Sede(),
    public plan: Plan = new Plan(),
    public periodo: number = 1,
    public ano_gravable: number = new Date().getFullYear(),
    public activo: boolean = false,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
