import { MateriaService } from './../../../../service/dashboard/materia.service';
import { Materia } from './../../../../modelo/materia';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PaginationMaterial } from 'src/app/paginationmaterial';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';

@Component({
  selector: 'app-actualizar-materias',
  templateUrl: './actualizar-materias.component.html',
  styleUrls: ['./actualizar-materias.component.css']
})
export class ActualizarMateriasComponent implements OnInit {
  @Output() out = new EventEmitter<Materia>();
  paginationMaterial: PaginationMaterial;
  materias: Materia[] = [];
  dataSource: MatTableDataSource<Materia>;
  displayedColumns: string[] = ['id', 'nombre', 'credito'];
  searchValue: string;
  activar: boolean;
  selectedRowIndex = -1;
  selection = new SelectionModel<Materia>(true, null);
  tipo: string;
  row: Materia;
  combobox = false;
  constructor(
    private materiaService: MateriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {

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
      materiaPagination => {
        this.materias = materiaPagination.array;
        this.dataSource = new MatTableDataSource<Materia>(this.materias);
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

  selectRow(row?: Materia) {
    this.row = row;
    this.out.emit(row);
    if (!this.combobox) {
      this.selection.select(row);
      this.router.navigate(['../actualizar-asignatura', row.id], { relativeTo: this.route });
    }
  }
}
