import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sede } from 'src/app/modelo/sede';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Localizacion } from 'src/app/modelo/localizacion';
import { SedeService } from 'src/app/service/dashboard/sede.service';

@Component({
  selector: 'app-actualizar-sede',
  templateUrl: './actualizar-sede.component.html',
  styleUrls: ['./actualizar-sede.component.css']
})
export class ActualizarSedeComponent implements OnInit {
  @Output() out = new EventEmitter<Sede>();
  paginationMaterial: PaginationMaterial;
  sedes: Sede[] = [];
  dataSource: MatTableDataSource<Sede>;
  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'latitud', 'longitud'];
  searchValue: string;
  activar: boolean;
  selectedRowIndex = -1;
  selection = new SelectionModel<Sede>(true, null);
  tipo: string;
  row: Sede;
  combobox = false;
  constructor(
    private sedeService: SedeService,
    private router: Router,
    private route: ActivatedRoute
  ) {

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
      sedesPagination => {
        this.sedes = sedesPagination.array;
        this.dataSource = new MatTableDataSource<Sede>(this.sedes);
        this.paginationMaterial = sedesPagination.pagination;
      });
  }

  addListElements(data: any[]) {
    data.forEach(element => {
      const localizacion = new Localizacion(
        element.latitud,
        element.longitud,
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
    this.row = row;
    this.out.emit(row);
    if (!this.combobox) {
      this.selection.select(row);
      this.router.navigate(['../actualizar-sede', row.id], { relativeTo: this.route });
    }
  }
}
