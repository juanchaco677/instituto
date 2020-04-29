import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../service/dashboard/usuario.service';
import { Usuario } from '../../../../modelo/usuario';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Util } from 'src/app/utils/util';
import { Localizacion } from 'src/app/modelo/localizacion';
@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  paginationMaterial: PaginationMaterial;
  usuarios: Usuario[] = [];
  isLoadingResults = true;
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['select', 'id', 'nombre', 'correo', 'cedula', 'celular'];
  selection = new SelectionModel<Usuario>(true, []);
  searchValue: string;
  activar: boolean;
  tipo: string;
  constructor(private snackBar: MatSnackBar, private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.tipo = params.get('tipo').toUpperCase();
    });

    if (Util.empty(this.usuarioService.listPagination$)) {
      this.consultarDatos(1, this.searchValue);
    } else {
      this.consultarDatosEnMemoria();
    }
  }

  ngOnInit() {

  }

  consultarDatos(page: number, searchValue: string) {
    this.usuarioService.getAll('auth/all-users-tipo', page, searchValue, this.tipo).subscribe(data => {
      this.usuarios = [];
      this.addListElements(data['usuario'].data);
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.paginationMaterial = new PaginationMaterial(
        data['usuario'].total,
        data['usuario'].per_page,
        [5, 10, 25, 100],
        page - 1
      );
      this.usuarioService.createList$(new AnyPagination(this.usuarios, this.paginationMaterial));
    });
  }

  consultarDatosEnMemoria() {
    this.usuarioService.getList$().subscribe(
      sedesPagination => {
        this.usuarios = sedesPagination.array;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.paginationMaterial = sedesPagination.pagination;
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
        localizacion,
      );
      this.usuarios.push(usuario);
    });
  }
  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.consultarDatos(1, searchValue);
  }

  removeSelectedRows() {
    this.activar = true;
    this.usuarioService.delete({ usuarios : this.selection.selected, buscar: this.searchValue }, 'auth/delete-users').subscribe(
      data => {
        if (data['success']) {
          if (this.usuarioService.size$() <= 1) {
            this.consultarDatos(
              this.usuarioService.listPagination$.getValue().pagination.page,
              this.searchValue
            );
          } else {
            this.consultarDatos(
              this.usuarioService.listPagination$.getValue().pagination.page + 1,
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
  checkboxLabel(row?: Usuario): string {
    if (this.dataSource != null) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
    }
  }


}
