import { AnyPagination } from './../../../../modelo/anyPagination';
import { Util } from './../../../../utils/util';
import { Router, ActivatedRoute } from '@angular/router';
import { ProgramaService } from './../../../../service/dashboard/programa.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Programa } from './../../../../modelo/programa';
import { PaginationMaterial } from './../../../../paginationmaterial';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actualizar-programa',
  templateUrl: './actualizar-programa.component.html',
  styleUrls: ['./actualizar-programa.component.css']
})
export class ActualizarProgramaComponent implements OnInit {
  @Output() out = new EventEmitter<Programa>();
  paginationMaterial: PaginationMaterial;
  programas: Programa[] = [];
  dataSource: MatTableDataSource<Programa>;
  displayedColumns: string[] = ['id', 'nombre'];
  searchValue: string;
  activar: boolean;
  selectedRowIndex = -1;
  selection = new SelectionModel<Programa>(true, null);
  tipo: string;
  row: Programa;
  combobox = false;
  constructor(
    private programaService: ProgramaService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    if (Util.empty(this.programaService.listPagination$)) {
      this.consultarDatos(0, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }
  }

  ngOnInit() {

  }


  consultarDatos(page: number, searchValue: string) {
    this.programaService.getAll('programa/get-all-pagination', page, searchValue, null).subscribe(data => {

      this.programas = data['programa'].data;
      this.dataSource = new MatTableDataSource<Programa>(this.programas);
      this.paginationMaterial = new PaginationMaterial(
        data['programa'].total,
        data['programa'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.programaService.createList$(new AnyPagination(this.programas, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.programaService.getList$().subscribe(
      materiaPagination => {
        this.programas = materiaPagination.array;
        this.dataSource = new MatTableDataSource<Programa>(this.programas);
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

  selectRow(row?: Programa) {
    this.row = row;
    this.out.emit(row);
    if (!this.combobox) {
      this.selection.select(row);
      this.router.navigate(['../actualizar-programa', row.id], { relativeTo: this.route });
    }
  }
}
