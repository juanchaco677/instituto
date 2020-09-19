import { MenuService } from './../../../../../dashboard/service/menu.service';
import { PaginationMaterial } from './../../../../../paginationmaterial';
import { Util } from 'src/app/utils/util';
import { Sesion } from './../../../../../utils/sesion';
import { ComentariosHijosComponent } from './comentarios-hijos/comentarios-hijos.component';
import { PropertiesForoComentarios } from './../../../../properties/properties-foro-comentarios';
import { ForoAulaComentario } from './../../../../model/foro-aula-comentario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ForoComentarioService } from './../../../../service/foro-comentario.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  Inject,
} from '@angular/core';
import { Location } from '@angular/common';
import { AnyPagination } from 'src/app/dashboard/modelo/anyPagination';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-foro-comentarios',
  templateUrl: './foro-comentarios.component.html',
  styleUrls: ['./foro-comentarios.component.css'],
})
export class ForoComentariosComponent implements OnInit {
  foroAulaComentario: ForoAulaComentario;
  foroAulaComentarios: ForoAulaComentario[] = [];
  id: number;
  @Output() out = new EventEmitter<any>();
  comentar = true;
  @ViewChild('htmlComentarioHijos')
  htmlComentarioHijos: ComentariosHijosComponent;
  titulo = 'Comentarios';
  spinner = false;
  constructor(
    public properties: PropertiesForoComentarios,
    public service: ForoComentarioService,
    public route: ActivatedRoute,
    public location: Location,
    public snackBar: MatSnackBar,
    private menuService: MenuService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id');
    });
    this.foroAulaComentario = new ForoAulaComentario();
    this.foroAulaComentario.foro.id = this.id;
    this.foroAulaComentario.usuario = Sesion.user();
    this.menuService.add$(properties.get('menu-foro-aula-materia').value);
  }
  ngOnInit(): void {

    if (this.comentar) {
      this.service.getList$().subscribe((data) => {
        if (!Util.empty(data) && !Util.empty(data.array) && data.array.length > 0) {
          this.foroAulaComentarios = data.array;
          this.titulo = this.foroAulaComentarios[0].foro.titulo;
        }
      });

      this.service
        .get('foro-aula-comentario/get-all', this.id)
        .subscribe((data) => {
          this.service.listPagination$.next(
            new AnyPagination(
              data.data,
              new PaginationMaterial(1, 5, [5, 10, 25, 100], 1 - 1)
            )
          );
        });
    }
  }
}
