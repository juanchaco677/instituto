import { MateriaService } from './../../../../service/dashboard/materia.service';
import { Materia } from './../../../../modelo/materia';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
@Component({
  selector: 'app-eliminar-materias',
  templateUrl: './eliminar-materias.component.html',
  styleUrls: ['./eliminar-materias.component.css']
})
export class EliminarMateriasComponent implements OnInit {

  paginationMaterial: PaginationMaterial;
  materia: Materia;
  materias: Materia[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<Materia>;
  displayedColumns: string[] = ['select', 'id', 'nombre', 'credito'];
  selection = new SelectionModel<Materia>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;
  constructor(private snackBar: MatSnackBar, private materiaService: MateriaService) {

    if (Util.empty(this.materiaService.listPagination$)) {
      this.consultarDatos(0, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }

  }

  ngOnInit() {

  }

  consultarDatos(page: number, searchValue: string) {
    this.materiaService.getAll('materia/get-all-pagination', page, searchValue, null).subscribe(data => {

      this.materias = data['materia'].data;
      this.dataSource = new MatTableDataSource<Materia>(this.materias);
      this.paginationMaterial = new PaginationMaterial(
        data['materia'].total,
        data['materia'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.materiaService.createList$(new AnyPagination(this.materias, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.materiaService.getList$().subscribe(
      materiPagination => {
        this.materias = materiPagination.array;
        this.dataSource = new MatTableDataSource<Materia>(this.materias);
        this.paginationMaterial = materiPagination.pagination;
      });
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  removeSelectedRows() {
    this.activar = true;
    this.materiaService.delete({ materias: this.selection.selected }, 'materia/delete').subscribe(data => {
      if (data['success']) {
        if (this.materiaService.size$() <= 1) {
          this.consultarDatos(
            this.materiaService.listPagination$.getValue().pagination.page,
            this.searchValue
          );
        } else {
          this.consultarDatos(
            this.materiaService.listPagination$.getValue().pagination.page + 1,
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
  checkboxLabel(row?: Materia): string {
    if (this.dataSource != null) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
    }
  }

}
