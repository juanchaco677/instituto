import { AnyPagination } from './anyPagination';
import { Util } from './../utils/util';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { Output, EventEmitter } from '@angular/core';
import { OperacionBD } from './operacion-bd';
import { ActivatedRoute, Router } from '@angular/router';
export class ActualizarBaseComponent {
  @Output() out = new EventEmitter<any>();
  paginationMaterial: PaginationMaterial;
  datas: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  searchValue: string;
  activar: boolean;
  selectedRowIndex = -1;
  selection = new SelectionModel<any>(true, null);
  tipo: string;
  row: any;
  combobox = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public service: OperacionBD,
    public routeBD: string,
    public routeWeb: string
  ) {
    if (Util.empty(this.service.listPagination$)) {
      this.consultarDatos(0, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }
  }

  consultarDatos(page: number, searchValue: string) {
    this.service.getAll(this.routeBD + '/get-all-pagination', page, searchValue, null).subscribe(data => {

      this.datas = data['data'].data;
      this.dataSource = new MatTableDataSource<any>(this.datas);
      this.paginationMaterial = new PaginationMaterial(
        data['data'].total,
        data['data'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.service.createList$(new AnyPagination(this.datas, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.service.getList$().subscribe(
      materiaPagination => {
        this.datas = materiaPagination.array;
        this.dataSource = new MatTableDataSource<any>(this.datas);
        this.paginationMaterial = materiaPagination.pagination;
      });
  }

  reciveMaterial(page) {
    this.consultarDatos(page.pageIndex + 1, this.searchValue);
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  selectRow(row?: any) {
    this.row = row;
    this.out.emit(row);
    if (!this.combobox) {
      this.selection.select(row);
      if (!Util.empty(row.id)) {
        this.router.navigate(['../' + this.routeWeb, row.id], { relativeTo: this.route });
      } else {
        this.router.navigate(['../' + this.routeWeb, row.compoundKey],  {
          relativeTo: this.route,
        });
      }
    }
  }

}
