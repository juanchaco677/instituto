import { Sede } from './sede';

export class Escuela {
  constructor(
    public id?: number,
    public nombre?: string,
    public sede?: Sede,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
