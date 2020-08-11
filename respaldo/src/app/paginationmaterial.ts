export class PaginationMaterial {
  public pageIni: number;
  public pageHas: number;
  public elementos: Array<number>;
  public pagePenultimo: number;
  constructor(
    public length: number,
    public pageSize: number,
    public pageSizeOptions: number[],
    public page?: number
  ) {

  }
}
