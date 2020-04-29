import { Materia } from './../../../../../modelo/materia';
import { LineaMateriaService } from './../../../../../service/dashboard/linea-materia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { LineaMateria } from './../../../../../modelo/linea-materia';
import { PaginationMaterial } from './../../../../../paginationmaterial';
import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';

@Component({
  selector: 'app-eliminar-linea-materias',
  templateUrl: './eliminar-linea-materias.component.html',
  styleUrls: ['./eliminar-linea-materias.component.css']
})
export class EliminarLineaMateriasComponent implements OnInit {

  paginationMaterial: PaginationMaterial;
  lineaMateria: LineaMateria;
  lineaMaterias: LineaMateria[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<LineaMateria>;
  displayedColumns: string[] = ['select', 'materiaOrigen', 'credito', 'materia' , 'credito'];
  selection = new SelectionModel<LineaMateria>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;
  constructor(
    private snackBar: MatSnackBar,
    private lineaMateriaService: LineaMateriaService,
  ) {

    if (Util.empty(this.lineaMateriaService.listPagination$)) {
      this.consultarDatos(0, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }

  }

  ngOnInit() {

  }

  consultarDatos(page: number, searchValue: string) {
    this.lineaMateriaService.getAll('linea-asignatura/get-all-pagination', page, searchValue, this.tipo).subscribe(data => {
      this.lineaMaterias = [];
      this.addListElements(data['linea-asignatura'].data);
      this.dataSource = new MatTableDataSource<LineaMateria>(this.lineaMaterias);
      this.paginationMaterial = new PaginationMaterial(
        data['linea-asignatura'].total,
        data['linea-asignatura'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.lineaMateriaService.createList$(new AnyPagination(this.lineaMaterias, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.lineaMateriaService.getList$().subscribe(
      lineaMateriaPagination => {
        this.lineaMaterias = lineaMateriaPagination.array;
        this.dataSource = new MatTableDataSource<LineaMateria>(this.lineaMaterias);
        this.paginationMaterial = lineaMateriaPagination.pagination;
      });
  }

  addListElements(data: any[]) {
    data.forEach(element => {
      const materiaOrigen = new Materia(
        element.id_o,
        element.nombre_o,
        element.credito_o,
        element.created_at_o,
        element.updated_at_o
      );

      const materia = new Materia(
        element.id_m,
        element.nombre_m,
        element.credito_m,
        element.created_at_m,
        element.updated_at_m
      );

      const lineMateria = new LineaMateria(
        materiaOrigen,
        materia,
        element.created_at,
        element.updated_at
      );
      this.lineaMaterias.push(lineMateria);
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  removeSelectedRows() {
    this.activar = true;
    this.lineaMateriaService.delete({ 'linea-asignatura': this.selection.selected }, 'linea-asignatura/delete').subscribe(data => {
      if (data['success']) {
        if (this.lineaMateriaService.size$() <= 1) {
          this.consultarDatos(
            this.lineaMateriaService.listPagination$.getValue().pagination.page,
            this.searchValue
          );
        } else {
          this.consultarDatos(
            this.lineaMateriaService.listPagination$.getValue().pagination.page + 1,
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
  checkboxLabel(row?: LineaMateria): string {
    if (this.dataSource != null) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
    }
  }
}
