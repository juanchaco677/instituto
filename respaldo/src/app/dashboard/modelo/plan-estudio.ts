import { Plan } from './plan';
import { Area } from './area';
import { Programa } from './programa';
import { Materia } from './materia';
export class PlanEstudio {
  constructor(
    public programa?: Programa,
    public materia?: Materia,
    public area?: Area,
    public plan?: Plan,
    public periodo?: number,
    public fecha_inicial?: number,
    public fecha_hasta?: number,
    public created_at?: string,
    public updated_at?: string,
    public compoundKeyData?: string
  ) {}
}
