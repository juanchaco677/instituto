import { Salon } from './salon';
import { AsigProfeAsigs } from './asig-profe-asigs';
import { DateTime } from 'luxon';
export class ProgramacionHorario {
  constructor(
    public asig_profe_asig?: AsigProfeAsigs ,
    public id?: number,
    public dia?: string,
    public hora_inicial?: DateTime,
    public hora_final?: DateTime,
    public fecha_inicial?: Date,
    public fecha_final?: Date,
    public created_at?: string,
    public updated_at?: string,
    public salon: Salon = new Salon(),
    public cupos = 0,
    public grupo = 0,
  ) {}
}
