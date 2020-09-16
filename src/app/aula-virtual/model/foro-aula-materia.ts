import { Usuario } from 'src/app/dashboard/modelo/usuario';
import { AsigProfeAsigs } from 'src/app/dashboard/modelo/asig-profe-asigs';

export class ForoAulaMateria {
  constructor(
    public id?: number,
    public profesor: Usuario = new Usuario(),
    public asig_profe_asig: AsigProfeAsigs = new AsigProfeAsigs() ,
    public titulo?: string,
    public descripcion?: string,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
