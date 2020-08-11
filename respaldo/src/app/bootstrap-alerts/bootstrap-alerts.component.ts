import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-bootstrap-alerts',
  templateUrl: './bootstrap-alerts.component.html',
  styleUrls: ['./bootstrap-alerts.component.css']
})
export class BootstrapAlertsComponent implements OnInit {

  @Input()data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
