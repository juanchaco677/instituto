import { Sede } from './sede';

export class Escuela {
  constructor(
    public sede?: Sede,
    public id?: number,
    public nombre?: string,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
