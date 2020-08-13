import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  @Input() width: string;
  @Input() height: string;
  @Input() comentario: string;
  @Input() fontSize: string;
  @HostBinding('style.--left')
  @Input() left = '10%';

  constructor() {}

  ngOnInit() {}
}
