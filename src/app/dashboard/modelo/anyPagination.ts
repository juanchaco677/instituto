import { PaginationMaterial } from 'src/app/paginationmaterial';

export class AnyPagination {

  constructor(
    public array: any[] = [],
    public pagination: PaginationMaterial = new PaginationMaterial(0 , 5 , [5, 10, 25, 100])
  ) {

  }

}
