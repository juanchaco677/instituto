import { Usuario } from './usuario';
export class Room {
  constructor(
    public id?: string,
    public usuario?: Usuario,
    public usuarios?: Usuario[],
    public chat?: [],

  ) {

  }
}
