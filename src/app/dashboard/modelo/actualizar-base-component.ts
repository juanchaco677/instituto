import { AnyPagination } from './anyPagination';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { Output, EventEmitter, OnInit, Input } from '@angular/core';
import { OperacionBD } from './operacion-bd';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'src/app/utils/util';
export class ActualizarBaseComponent implements OnInit {
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
  @Input() htmlCrear: any;
  @Input() htmlPlantilla: any;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public service: OperacionBD,
    public routeBD: string,
    public routeWeb: string,
    public generic: boolean = false,
    public data?: any
  ) {
    if (!Util.empty(route)) {
      this.route.paramMap.subscribe((params) => {
        this.tipo = !Util.empty(params.get('tipo'))
          ? params.get('tipo').toUpperCase()
          : null;
        console.log('el log tiene algo');
        console.log(this.tipo);
      });
    }

    this.consultarDatos(0, this.searchValue);
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
  ngOnInit(): void {
    this.consultarDatosEnMemoria();
  }

  consultarDatosEnMemoria() {
    this.service.getList$().subscribe((materiaPagination) => {
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
    if (!Util.empty(this.htmlPlantilla)) {
      this.htmlCrear.actCrear = true;
      const data = this.service.buscarElementList$({ id: row.id });
      this.htmlCrear.addElement(data);
      this.htmlPlantilla.titleTap = 'Registro';
      this.htmlPlantilla.tabGroup.selectedIndex = 0;
    } else {
      if (!this.combobox) {
        this.selection.select(row);
        if (!Util.empty(row.id)) {
          if (!Util.empty(this.tipo)) {
            this.router.navigate(
              ['../../' + this.routeWeb, row.id, this.tipo],
              {
                relativeTo: this.route,
              }
            );
          } else {
            this.router.navigate(['../' + this.routeWeb, row.id], {
              relativeTo: this.route,
            });
          }
        } else {
          this.router.navigate(['../' + this.routeWeb, row.compoundKey], {
            relativeTo: this.route,
          });
        }
      }
    }
  }
}
