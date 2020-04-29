import { AnyPagination } from './../../../../modelo/anyPagination';
import { Util } from './../../../../utils/util';
import { ProgramaService } from './../../../../service/dashboard/programa.service';
import { MateriaService } from './../../../../service/dashboard/materia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { PaginationMaterial } from './../../../../paginationmaterial';
import { MatTableDataSource } from '@angular/material/table';
import { Programa } from './../../../../modelo/programa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-programa',
  templateUrl: './eliminar-programa.component.html',
  styleUrls: ['./eliminar-programa.component.css']
})
export class EliminarProgramaComponent implements OnInit {

  paginationMaterial: PaginationMaterial;
  programa: Programa;
  programas: Programa[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<Programa>;
  displayedColumns: string[] = ['select', 'id', 'nombre'];
  selection = new SelectionModel<Programa>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;
  constructor(
    private snackBar: MatSnackBar,
    private programaService: ProgramaService
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
      programaPagination => {
        this.programas = programaPagination.array;
        this.dataSource = new MatTableDataSource<Programa>(this.programas);
        this.paginationMaterial = programaPagination.pagination;
      });
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  removeSelectedRows() {
    this.activar = true;
    this.programaService.delete({ programas: this.selection.selected }, 'programa/delete').subscribe(data => {
      if (data['success']) {
        if (this.programaService.size$() <= 1) {
          this.consultarDatos(
            this.programaService.listPagination$.getValue().pagination.page,
            this.searchValue
          );
        } else {
          this.consultarDatos(
            this.programaService.listPagination$.getValue().pagination.page + 1,
            this.searchValue
          );
        }
        Util.openSnackBar(this.snackBar, 'Eliminación exitosa.', 1, 'bottom');
      }
      this.activar = false;
    });
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
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Programa): string {
    if (this.dataSource != null) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
    }
  }

}
