import { Sede } from './sede';
export class Salon {
  constructor(
    public sede?: Sede,
    public id?: number,
    public nombre?: string,
    public created_at?: string,
    public updated_at?: string
  ) {}
}
