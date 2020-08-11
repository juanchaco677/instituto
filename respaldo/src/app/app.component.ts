import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  host: {class: 'foo'},
})
export class AppComponent  {
  title = 'instituto';
    constructor(){}

}
