import { ThemeService } from './../../theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  constructor(private themeService: ThemeService) {
    this.themeService.add$(2);
  }

  ngOnInit(): void {}
}
