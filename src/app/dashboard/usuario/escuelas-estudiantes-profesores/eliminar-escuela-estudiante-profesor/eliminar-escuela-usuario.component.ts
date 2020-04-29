import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EscuelaUsuario } from 'src/app/modelo/escuela-usuario';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EscuelaUsuarioService } from 'src/app/service/dashboard/escuela-usuario.service';
import { Util } from 'src/app/utils/util';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Usuario } from 'src/app/modelo/usuario';
import { Escuela } from 'src/app/modelo/escuela';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-eliminar-escuela-usuario',
  templateUrl: './eliminar-escuela-usuario.component.html',
  styleUrls: ['./eliminar-escuela-usuario.component.css']
})
export class EliminarEscuelaUsuarioComponent implements OnInit {

  paginationMaterial: PaginationMaterial;
  escuelaUsuario: EscuelaUsuario;
  escuelaUsuarios: EscuelaUsuario[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<EscuelaUsuario>;
  displayedColumns: string[] = ['select', 'cedula', 'profesor', 'escuela'];
  selection = new SelectionModel<EscuelaUsuario>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;
  constructor(
    private snackBar: MatSnackBar,
    private escuelaUsuarioService: EscuelaUsuarioService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.tipo = params.get('tipo').toUpperCase();
    });
    if (Util.empty(this.escuelaUsuarioService.listPagination$)) {
      this.consultarDatos(0, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }

  }

  ngOnInit() {

  }

  consultarDatos(page: number, searchValue: string) {
    this.escuelaUsuarioService.getAll('escuela-usuario/get-all-pagination', page, searchValue, this.tipo).subscribe(data => {
      this.escuelaUsuarios = [];
      this.addListElements(data['escuela-usuario'].data);
      this.dataSource = new MatTableDataSource<EscuelaUsuario>(this.escuelaUsuarios);
      this.paginationMaterial = new PaginationMaterial(
        data['escuela-usuario'].total,
        data['escuela-usuario'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.escuelaUsuarioService.createList$(new AnyPagination(this.escuelaUsuarios, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.escuelaUsuarioService.getList$().subscribe(
      escuelaPagination => {
        this.escuelaUsuarios = escuelaPagination.array;
        this.dataSource = new MatTableDataSource<EscuelaUsuario>(this.escuelaUsuarios);
        this.paginationMaterial = escuelaPagination.pagination;
      });
  }

  addListElements(data: any[]) {
    data.forEach(element => {
      const usuario = new Usuario(
        element.email,
        null,
        element.id,
        element.nombre,
        element.nombre_uno,
        element.nombre_dos,
        element.apellido_uno,
        element.apellido_dos,
        element.tipo,
        element.cedula,
        element.telefono,
        element.celular,
        element.fechanacimiento,
        element.foto,
        element.sex,
        element.created_at,
        element.updated_at,
        null,
        null);
      const escuela = new Escuela(
        +element.id_escuela,
        element.nombre_e,
        null,
        element.created_at_e,
        element.updated_at_e);
      const escuelaUsuario = new EscuelaUsuario(usuario, escuela, element.created_at_eu, element.updated_at_eu);
      this.escuelaUsuarios.push(escuelaUsuario);
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  removeSelectedRows() {
    this.activar = true;
    this.escuelaUsuarioService.delete({ 'escuela-usuario': this.selection.selected }, 'escuela-usuario/delete').subscribe(data => {
      if (data['success']) {
        if (this.escuelaUsuarioService.size$() <= 1) {
          this.consultarDatos(
            this.escuelaUsuarioService.listPagination$.getValue().pagination.page,
            this.searchValue
          );
        } else {
          this.consultarDatos(
            this.escuelaUsuarioService.listPagination$.getValue().pagination.page + 1,
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
  checkboxLabel(row?: EscuelaUsuario): string {
    if (this.dataSource != null) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
    }
  }
}
