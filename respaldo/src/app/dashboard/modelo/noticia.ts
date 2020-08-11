import { Multimedia } from './multimedia';
export class Noticia {
  constructor(
    public multimedia?: Multimedia,
    public id?: number,
    public titulo?: string,
    public descripcion?: string,
    public multimedias?: Multimedia[],
    public created_at?: string,
    public updated_at?: string
  ) {}
}
