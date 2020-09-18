import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnyPagination } from './anyPagination';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { OperacionBD } from './operacion-bd';
import { Util } from 'src/app/utils/util';
import { OnInit } from '@angular/core';
export class EliminarBaseComponent implements OnInit {
  paginationMaterial: PaginationMaterial;
  datas: any[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  selection = new SelectionModel<any>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;

  constructor(
    public snackBar: MatSnackBar,
    public service: OperacionBD,
    public routeBD: string,
    public route?: ActivatedRoute,
    public generic: boolean = false,
    public data?: any
  ) {
    if (!Util.empty(route)) {
      this.route.paramMap.subscribe((params) => {
        this.tipo = !Util.empty(params.get('tipo'))
          ? params.get('tipo').toUpperCase()
          : null;
      });
    }

    this.consultarDatos(0, this.searchValue);
  }
  ngOnInit(): void {
    this.consultarDatosEnMemoria();
  }

  consultarDatos(page: number, searchValue: string) {
    if (!this.generic) {
      this.service
        .getAll(
          this.routeBD + '/get-all-pagination',
          page,
          searchValue,
          this.tipo
        )
        .subscribe((data) => {
          this.datas = data['data'].data;
          this.dataSource = new MatTableDataSource<any>(this.datas);
          this.paginationMaterial = new PaginationMaterial(
            data['data'].total,
            data['data'].per_page,
            [5, 10, 25, 100],
            page - 1
          );
          const anyPagination = new AnyPagination(
            this.datas,
            this.paginationMaterial
          );
          this.service.listPagination$.next(anyPagination);
        });
    } else {
      this.service
        .getAllGeneric(
          this.routeBD + '/get-all-pagination',
          page,
          JSON.stringify({ buscar: searchValue, data: this.data })
        )
        .subscribe((data) => {
          this.datas = data['data'].data;
          this.dataSource = new MatTableDataSource<any>(this.datas);
          this.paginationMaterial = new PaginationMaterial(
            data['data'].total,
            data['data'].per_page,
            [5, 10, 25, 100],
            page - 1
          );
          const anyPagination = new AnyPagination(
            this.datas,
            this.paginationMaterial
          );
          this.service.listPagination$.next(anyPagination);
        });
    }
  }

  consultarDatosEnMemoria() {
    this.service.getList$().subscribe((anyPagination) => {
      this.datas = anyPagination.array;
      this.dataSource = new MatTableDataSource<any>(this.datas);
      this.paginationMaterial = anyPagination.pagination;
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  removeSelectedRows() {
    this.activar = true;
    this.service
      .delete({ datas: this.selection.selected }, this.routeBD + '/delete')
      .subscribe(
        (data) => {
          if (data['success']) {
            if (this.service.size$() <= 1) {
              this.consultarDatos(
                this.service.listPagination$.getValue().pagination.page,
                this.searchValue
              );
            } else {
              this.consultarDatos(
                this.service.listPagination$.getValue().pagination.page + 1,
                this.searchValue
              );
            }
            Util.openSnackBar(
              this.snackBar,
              'Eliminación exitosa.',
              1,
              'bottom'
            );
          }
          this.selection = new SelectionModel<any>(true, []);
          this.activar = false;
        },
        (error) => {
          Util.openSnackBar(this.snackBar, error.error.error, 3, 'top');
          this.activar = false;
        }
      );
  }

  reciveMaterial(page) {
    this.consultarDatos(page.pageIndex + 1, this.searchValue);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.dataSource != null) {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (this.dataSource != null) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
    }
  }
}
