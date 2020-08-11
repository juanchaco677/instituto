import { Usuario } from './usuario';
export class Chat {
  constructor(
    public estudiante?: Usuario,
    public mensaje?: string,
    public mano?: boolean
  ) {

  }
}
