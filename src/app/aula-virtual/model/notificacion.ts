export class Notificacion {
  public hora: Date = new Date();
  constructor(
    public titulo: string,
    public descripcion: string,
    public segundos: number,
    public tipo: number,
    public data: any
  ) {}
}
