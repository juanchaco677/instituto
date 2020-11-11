import { Component, OnInit, Input } from '@angular/core';
import { Util } from 'src/app/utils/util';
import { ForoComentariosComponent } from '../../foro-comentarios.component';
import { MatDialog } from '@angular/material/dialog';
import { Sesion } from 'src/app/utils/sesion';

@Component({
  selector: 'app-item-foro',
  templateUrl: './item-foro.component.html',
  styleUrls: ['./item-foro.component.css']
})
export class ItemForoComponent implements OnInit {
  @Input() element: any;
  @Input() visible: boolean;
  visibleHijos = true;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

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
    dialogRef.componentInstance.foroAulaComentario.comentario = '';
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
