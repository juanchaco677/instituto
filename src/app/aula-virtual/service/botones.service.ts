import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BotonesService {
  botones$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
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
}
