import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Notificacion } from '../aula-virtual/model/notificacion';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  @Output() out = new EventEmitter<boolean>();
  @Input() notificacion: Notificacion;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.out.emit(true), this.notificacion.segundos);
  }

}
