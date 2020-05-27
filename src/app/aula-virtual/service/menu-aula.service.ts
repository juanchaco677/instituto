import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuAulaService {
  menuOpcion$ = new BehaviorSubject<string>(null);
  constructor() { }

  add$(menuOpcion: string){
    this.menuOpcion$.next(menuOpcion);
  }

  get$(){
    return this.menuOpcion$.asObservable();
  }

  delete(){
    this.menuOpcion$.next(null);
  }

}
