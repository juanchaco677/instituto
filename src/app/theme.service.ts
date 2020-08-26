import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {

  theme$ = new BehaviorSubject<number>(null);
  constructor() { }

  add$(opcion: number){
    this.theme$.next(opcion);
  }

  get$(){
    return this.theme$.asObservable();
  }

  delete(){
    this.theme$.next(null);
  }


}
