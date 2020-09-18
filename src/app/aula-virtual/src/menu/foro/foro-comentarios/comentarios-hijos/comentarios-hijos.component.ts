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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  getUrl(usuario: any) {
    return Util.getUrlImage(usuario);
  }
  openDialogo(element: any) {

    const dialogRef = this.dialog.open(ForoComentariosComponent, {
      width: '950px',
      height: '70vh',
      data: 'dato por favor'
    });
    console.log('elementooooooooooooooooooooooooooo');
    console.log(element);
    dialogRef.componentInstance.titulo = element.foro.titulo;
    dialogRef.componentInstance.comentar = false;
    dialogRef.componentInstance.foroAulaComentario.comentario_padre = element;
    dialogRef.componentInstance.foroAulaComentario.foro = element.foro;
    dialogRef.componentInstance.foroAulaComentario.comentario = '' ;
    dialogRef.componentInstance.foroAulaComentario.usuario = Sesion.user();
    const aux = [];
    aux.push(element);
    dialogRef.componentInstance.foroAulaComentarios = [];
    dialogRef.componentInstance.foroAulaComentarios = aux;
    console.log('otro elemento');
    dialogRef.componentInstance.out.subscribe((out: boolean) => {
      if (out) {
        dialogRef.close();
      }
    });
  }
}
