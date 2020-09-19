import { Materia } from './../../dashboard/modelo/materia';
import { Usuario } from 'src/app/dashboard/modelo/usuario';
import { AsigProfeAsigs } from 'src/app/dashboard/modelo/asig-profe-asigs';

export class ForoAulaMateria {
  constructor(
    public id?: number,
    public profesor: Usuario = new Usuario(),
    public materia: Materia = new Materia() ,
    public titulo?: string,
    public descripcion?: string,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
