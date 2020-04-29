export class Pagination {
  public pageIni: number;
  public pageHas: number;
  public elementos: Array<number>;
  public pagePenultimo: number;
  constructor(
    public currentPage: number,
    public totalPages: number,
    public url: String
  ) {

    this.pageIni = 2 > currentPage - 5 ? 2 : currentPage - 5;
    this.pageHas = totalPages < currentPage + 6 ? totalPages : currentPage + 6;
    this.elementos = new Array<number>();

    for (let i = this.pageIni; i < this.pageHas; i++) {
      this.elementos.push(i);
      this.pagePenultimo = i + 1;
    }
  }
}
