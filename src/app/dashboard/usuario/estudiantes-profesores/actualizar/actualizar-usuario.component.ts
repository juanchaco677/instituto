import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { UsuarioService } from '../../../../service/dashboard/usuario.service';
import { Usuario } from '../../../../modelo/usuario';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationMaterial } from 'src/app/paginationmaterial';
import { AnyPagination } from 'src/app/modelo/anyPagination';
import { Util } from 'src/app/utils/util';
import { Localizacion } from 'src/app/modelo/localizacion';
@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {
  @Output() out = new EventEmitter<Usuario>();
  paginationMaterial: PaginationMaterial;
  usuarios: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'cedula', 'celular'];
  searchValue: string ;
  activar: boolean;
  selectedRowIndex = -1;
  selection = new SelectionModel<Usuario>(true, null);
  tipo: string;
  combobox = false;
  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.tipo = !Util.empty(params.get('tipo')) ? params.get('tipo').toUpperCase() : '';
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
        localizacion);
      this.usuarios.push(usuario);
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
    this.consultarDatos(-1, searchValue);
  }

  selectRow(row?: Usuario) {
    if (!this.combobox) {
      this.selection.select(row);
      this.router.navigate(['../../actualizar-perfil', row.id, row.tipo], { relativeTo: this.route });
    }else{
      this.out.emit(row);
    }
  }
}
