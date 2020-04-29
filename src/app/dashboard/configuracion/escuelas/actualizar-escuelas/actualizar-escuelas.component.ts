import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Escuela } from 'src/app/modelo/escuela';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { EscuelaService } from 'src/app/service/dashboard/escuela.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Sede } from 'src/app/modelo/sede';
@Component({
  selector: 'app-actualizar-escuelas',
  templateUrl: './actualizar-escuelas.component.html',
  styleUrls: ['./actualizar-escuelas.component.css']
})
export class ActualizarEscuelasComponent implements OnInit {
  @Output() out = new EventEmitter<Escuela>();
  paginationMaterial: PaginationMaterial;
  escuelas: Escuela[] = [];
  dataSource: MatTableDataSource<Escuela>;
  displayedColumns: string[] = ['id', 'nombre', 'sede'];
  searchValue: string;
  activar: boolean;
  selectedRowIndex = -1;
  selection = new SelectionModel<Escuela>(true, null);
  tipo: string;
  combobox = false;
  constructor(private sedeService: EscuelaService, private router: Router, private route: ActivatedRoute) {

    if (Util.empty(this.sedeService.listPagination$)) {
      this.consultarDatos(0, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }

  }

  ngOnInit() {

  }


  consultarDatos(page: number, searchValue: string) {
    this.sedeService.getAll('escuela/get-all-pagination', page, searchValue, null).subscribe(data => {
      this.escuelas = [];
      this.addListElements(data['escuela'].data);
      this.dataSource = new MatTableDataSource<Escuela>(this.escuelas);
      this.paginationMaterial = new PaginationMaterial(
        data['escuela'].total,
        data['escuela'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.sedeService.createList$(new AnyPagination(this.escuelas, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.sedeService.getList$().subscribe(
      sedesPagination => {
        this.escuelas = sedesPagination.array;
        this.dataSource = new MatTableDataSource<Escuela>(this.escuelas);
        this.paginationMaterial = sedesPagination.pagination;
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

  selectRow(row?: Sede) {

    if (!this.combobox) {
      this.selection.select(row);
      this.router.navigate(['../actualizar-escuela', row.id], { relativeTo: this.route });
    } else {
      this.out.emit(row);
    }
  }

}
