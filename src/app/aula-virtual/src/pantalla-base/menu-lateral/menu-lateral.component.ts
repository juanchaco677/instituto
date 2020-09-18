import { Usuario } from './../../../model/usuario';
import { ListRoomService } from './../../../service/list-room.service';
import { Sesion } from './../../../../utils/sesion';
import { HttpParams } from '@angular/common/http';
import { MenuAulaService } from './../../../service/menu-aula.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent implements OnInit {
  clases = [];
  @Input()
  inputData: any;
  usuario: Usuario;
  constructor(
    private menuService: MenuAulaService,
    private service: ListRoomService
  ) {}
  ngOnInit() {
    // this.consultarDatos();
    this.consultarClasesEstudiante();
    this.usuario = Sesion.userAulaChat();
  }

  addMenuOpcion(data: string) {
    this.menuService.add$(data);
  }

  consultarClasesEstudiante() {
    const params = new HttpParams({
      fromString: 'data=' + Sesion.userAulaChat().id,
    });

    this.service
      .getList('incripcion-horario-estudiante/get-estudiante', params)
      .subscribe((data: any) => {
        if (data.success) {
          this.clases = data.data;
          console.log('mal parioqueco..');
          console.log(this.clases);
        }
      });
  }
}
