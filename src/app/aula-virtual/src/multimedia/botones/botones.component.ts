import { Router } from '@angular/router';
import { Video } from './../../../model/video';
import { Sesion } from 'src/app/utils/sesion';
import { Usuario } from './../../../model/usuario';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Util } from './../../../../utils/util';
import { BotonesService } from './../../../service/botones.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css'],
})
export class BotonesComponent implements OnInit {
  cam = false;
  audio = false;
  desktop = false;
  hand = false;
  visibleCompartir = false;
  @Input() visible = true;
  @Input() htmlListVideo: any;
  visibleComentario = [false, false, false, false, false, false, false, false];
  room = new Room(null, {}, [], {}, {}, {});
  usuario: Usuario;
  constructor(
    private botones: BotonesService,
    private socket: SocketIoClientService,
    public router: Router
  ) {
    this.usuario = Sesion.userAulaChat();
  }

  ngOnInit(): void {
    this.socket.getRoom$().subscribe((data) => {
      if (!Util.empty(data) && !Util.empty(data.id)) {
        this.room = data;
        if (
          !Util.empty(this.room.usuarios[this.usuario.id].boton) &&
          !Util.empty(this.room.usuarios[this.usuario.id].boton.mano)
        ) {
          const boton = this.room.usuarios[this.usuario.id].boton;
          this.hand = boton.mano;
          this.cam = boton.video;
          this.audio = boton.audio;
        }
      }
    });

    this.socket.$enviarControlesS.subscribe((data) =>
      this.listenControles(data)
    );
  }

  startVideo() {
    this.cam = !this.cam;
    this.botones.add(Util.video);
  }

  startMic() {
    this.audio = !this.audio;
    this.botones.add(Util.audio);
  }

  startVideoDesktop() {
    this.desktop = true;
    this.botones.add(Util.desktop);
  }

  stopVideoDesktop() {
    this.desktop = false;
    this.botones.add(Util.stopDesktop);
  }

  sidenav() {
    this.botones.addSidenav(true);
  }

  redistribuir(opcion: string) {
    this.botones.add(Util.redistribuir[opcion]);
  }

  cerrar() {
    this.botones.add(Util.cerrar);
    this.socket.emit('closeUserS', {
      id: this.room.id,
      usuario: this.room.usuarios[this.usuario.id],
    });
    this.router.navigate(['../../../aula-virtual/list-clases']);
  }

  starHand() {
    this.hand = !this.hand;
    this.botones.add(Util.mano);
  }

  listenControles(data: any) {
    if (!Util.empty(data)) {
      switch (data.opcion) {
        case 1:
          this.cam = true;
          this.startVideo();
          break;
        case 2:
          this.audio = true;
          this.startMic();
          break;

        case 3:
          this.starHand();
          break;
      }
    }
  }
}
