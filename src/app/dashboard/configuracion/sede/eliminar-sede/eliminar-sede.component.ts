import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Util } from 'src/app/utils/util';
import { Sede } from 'src/app/modelo/sede';
import { Localizacion } from 'src/app/modelo/localizacion';
import { SedeService } from 'src/app/service/dashboard/sede.service';
@Component({
  selector: 'app-eliminar-sede',
  templateUrl: './eliminar-sede.component.html',
  styleUrls: ['./eliminar-sede.component.css']
})
export class EliminarSedeComponent implements OnInit {

  paginationMaterial: PaginationMaterial;
  sede: Sede;
  sedes: Sede[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<Sede>;
  displayedColumns: string[] = ['select', 'id', 'nombre', 'direccion', 'latitud', 'longitud'];
  selection = new SelectionModel<Sede>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;
  constructor(private snackBar: MatSnackBar, private sedeService: SedeService) {

    if (Util.empty(this.sedeService.listPagination$)) {
      this.consultarDatos(0, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }

  }

  ngOnInit() {

  }

  consultarDatos(page: number, searchValue: string) {
    this.sedeService.getAll('sede/get-all-pagination', page, searchValue, null).subscribe(data => {
      this.sedes = [];
      this.addListElements(data['sede'].data);
      this.dataSource = new MatTableDataSource<Sede>(this.sedes);
      this.paginationMaterial = new PaginationMaterial(
        data['sede'].total,
        data['sede'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.sedeService.createList$(new AnyPagination(this.sedes, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.sedeService.getList$().subscribe(
      sedespagiination => {
        this.sedes = sedespagiination.array;
        this.dataSource = new MatTableDataSource<Sede>(this.sedes);
        this.paginationMaterial = sedespagiination.pagination;
      });
  }

  addListElements(data: any[]) {
    data.forEach(element => {
      const localizacion = new Localizacion(
        +element.latitud,
        +element.longitud,
        element.id_localizacion,
        element.direccion,
        element.id_ciudad,
        element.created_at_l,
        element.updated_at_l
      );
      const sede = new Sede(element.id,
        element.nombre,
        localizacion,
        element.created_at,
        element.updated_at);
      this.sedes.push(sede);
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  removeSelectedRows() {
    this.activar = true;
    this.sedeService.delete({ sedes: this.selection.selected }, 'sede/delete').subscribe(data => {
      if (data['success']) {
        if (this.sedeService.size$() <= 1) {
          this.consultarDatos(
            this.sedeService.listPagination$.getValue().pagination.page,
            this.searchValue
          );
        } else {
          this.consultarDatos(
            this.sedeService.listPagination$.getValue().pagination.page + 1,
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
