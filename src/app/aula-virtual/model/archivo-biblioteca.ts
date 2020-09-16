import { Salon } from './../../dashboard/modelo/salon';
import { ProgramacionHorario } from './../../dashboard/modelo/programacion-horario';
import { Usuario } from './usuario';

export class ArchivoBiblioteca {

  constructor(
    public id?: number,
    public nombre?: string,
    public extension?: string,
    public tipo?: string,
    public usuario: Usuario = new Usuario(),
    public salon: Salon = new Usuario(),
    public programacion_horario: ProgramacionHorario = new ProgramacionHorario(),
    public totalPaginas?: number,
    public ppt_integrantes: [] = [],
    public todos?: boolean
  ) {
  }
}
