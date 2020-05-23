import { Localizacion } from './localizacion';

export class Sede {

  constructor(
    public localizacion?: Localizacion,
    public id?: number,
    public nombre?: string,
    public created_at?: string,
    public updated_at?: string
  ) {

  }

}
