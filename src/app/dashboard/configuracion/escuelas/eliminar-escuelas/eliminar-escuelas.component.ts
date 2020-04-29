import { Component, OnInit } from '@angular/core';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { Escuela } from 'src/app/modelo/escuela';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EscuelaService } from 'src/app/service/dashboard/escuela.service';
import { Util } from 'src/app/utils/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Sede } from 'src/app/modelo/sede';
@Component({
  selector: 'app-eliminar-escuelas',
  templateUrl: './eliminar-escuelas.component.html',
  styleUrls: ['./eliminar-escuelas.component.css']
})
export class EliminarEscuelasComponent implements OnInit {

  paginationMaterial: PaginationMaterial;
  escuela: Escuela;
  escuelas: Escuela[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<Escuela>;
  displayedColumns: string[] = ['select', 'id', 'nombre', 'sede'];
  selection = new SelectionModel<Escuela>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;
  constructor(private snackBar: MatSnackBar, private escuelaService: EscuelaService) {

    if (Util.empty(this.escuelaService.listPagination$)) {
      this.consultarDatos(0, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }

  }

  ngOnInit() {

  }

  consultarDatos(page: number, searchValue: string) {
    this.escuelaService.getAll('escuela/get-all-pagination', page, searchValue, null).subscribe(data => {
      this.escuelas = [];
      this.addListElements(data['escuela'].data);
      this.dataSource = new MatTableDataSource<Escuela>(this.escuelas);
      this.paginationMaterial = new PaginationMaterial(
        data['escuela'].total,
        data['escuela'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.escuelaService.createList$(new AnyPagination(this.escuelas, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.escuelaService.getList$().subscribe(
      escuelaPagination => {
        this.escuelas = escuelaPagination.array;
        this.dataSource = new MatTableDataSource<Escuela>(this.escuelas);
        this.paginationMaterial = escuelaPagination.pagination;
      });
  }

  addListElements(data: any[]) {
    data.forEach(element => {
      const sede = new Sede(
        +element.id_sede,
        element.nombre_s,
        null,
        element.created_at_s,
        element.updated_at_s
      );
      const escuela = new Escuela(
        +element.id,
        element.nombre,
        sede,
        element.created_at,
        element.updated_at);
      this.escuelas.push(escuela);
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  removeSelectedRows() {
    this.activar = true;
    this.escuelaService.delete({ escuelas: this.selection.selected }, 'escuela/delete').subscribe(data => {
      if (data['success']) {
        if (this.escuelaService.size$() <= 1) {
          this.consultarDatos(
            this.escuelaService.listPagination$.getValue().pagination.page,
            this.searchValue
          );
        } else {
          this.consultarDatos(
            this.escuelaService.listPagination$.getValue().pagination.page + 1,
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
  checkboxLabel(row?: Sede): string {
    if (this.dataSource != null) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
    }
  }
}
