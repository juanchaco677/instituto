import { NivelEducativo } from './nivel-educativo';
import { Modalidad } from './modalidad';
export class Programa {
  constructor(
    public id?: number,
    public nombre?: string,
    public nivel_academico?: NivelEducativo,
    public mision?: string,
    public vision?: string,
    public justificacion?: string,
    public descripcion?: string,
    public competencias?: string,
    public perfiles?: string,
    public caracteristicas?: string,
    public propositios?: string,
    public modalidad?: Modalidad,
    public created_at?: string,
    public updated_at?: string
  ) {

  }
}
