import { ForoAulaMateria } from './foro-aula-materia';
import { Usuario } from 'src/app/dashboard/modelo/usuario';

export class ForoAulaComentario {
  constructor(
    public id?: number,
    public foro: ForoAulaMateria = new ForoAulaMateria(),
    public usuario: Usuario = new Usuario() ,
    public comentario_padre?: ForoAulaComentario,
    public comentario_hijo: [] = [],
    public comentario?: string,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
