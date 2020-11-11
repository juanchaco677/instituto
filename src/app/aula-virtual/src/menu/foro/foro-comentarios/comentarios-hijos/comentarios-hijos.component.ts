import { Sesion } from './../../../../../../utils/sesion';
import { ForoAulaComentario } from './../../../../../model/foro-aula-comentario';
import { ForoComentariosComponent } from './../foro-comentarios.component';
import { MatDialog } from '@angular/material/dialog';
import { Util } from './../../../../../../utils/util';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comentarios-hijos',
  templateUrl: './comentarios-hijos.component.html',
  styleUrls: ['./comentarios-hijos.component.css'],
})
export class ComentariosHijosComponent implements OnInit {
  @Input() comentariosHijos = [];
  @Input() visible: boolean;
  constructor() {}

  ngOnInit(): void {}

}
