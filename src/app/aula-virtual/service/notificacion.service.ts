import { Util } from 'src/app/utils/util';
import { Notificacion } from './../model/notificacion';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificacionService {
  notificaciones$: BehaviorSubject<Notificacion[]> = new BehaviorSubject<Notificacion[]>([]);
  constructor() { }

  add$(notificacion: Notificacion){
    let lista = [];
    if (!Util.empty(this.notificaciones$.getValue()) && this.notificaciones$.getValue().length === 0){
      lista.push(notificacion);
    }else{
      lista = [notificacion].concat(this.notificaciones$.getValue())
    }
    this.notificaciones$.next(lista);
  }

  addList(notificaciones: Notificacion[]){
    this.notificaciones$.next(notificaciones);
  }

  get$(){
    return this.notificaciones$.asObservable();
  }

  delete(){
    this.notificaciones$.next(null);
  }
}
