import { MenuService } from '../../../service/menu.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  @Input()
  inputData: any;
  constructor(
    private menuService: MenuService,
  ) {

  }



  ngOnInit() {
    // this.consultarDatos();
  }

  addMenuOpcion(data: string) {
    this.menuService.add$(data);
  }

}
