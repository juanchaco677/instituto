import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BotonesService {
  botones$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  sidenav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor() {}

  add(data: string) {
    this.botones$.next(data);
  }

  get() {
    return this.botones$.asObservable();
  }

  delete() {
    this.botones$.next(null);
  }

  addSidenav(data: boolean) {
    this.sidenav$.next(data);
  }

  getSidenav() {
    return this.sidenav$.asObservable();
  }

  deleteSidenav() {
    this.sidenav$.next(null);
  }
}
