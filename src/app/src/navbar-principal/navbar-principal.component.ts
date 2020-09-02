import { ThemeService } from './../../theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-principal',
  templateUrl: './navbar-principal.component.html',
  styleUrls: ['./navbar-principal.component.css']
})
export class NavbarPrincipalComponent implements OnInit {

  constructor(private themeService: ThemeService) {
    this.themeService.add$(2);
   }

  ngOnInit(): void {

  }

}
