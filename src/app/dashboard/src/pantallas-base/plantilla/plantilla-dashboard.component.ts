import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plantilla-dashboard',
  templateUrl: './plantilla-dashboard.component.html',
  styleUrls: ['./plantilla-dashboard.component.css']
})
export class PlantillaDashboardComponent implements OnInit {
  activar = false;
  constructor(
    private route: ActivatedRoute

  ) { }
  ngOnInit() {
  }

  loading(activar){
    this.activar = activar;
  }

}
