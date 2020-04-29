import { Localizacion } from './localizacion';

export class Sede {

  constructor(
    public id?: number,
    public nombre?: string,
    public localizacion?: Localizacion,
    public created_at?: string,
    public updated_at?: string
  ) {

  }

}
