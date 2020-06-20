import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { ProgramacionHorario } from './../../../../dashboard/modelo/programacion-horario';
import { PeerServerEmisorReceptor } from './../../../model/peer-server-emisor-receptor';
import { Sesion } from './../../../../utils/sesion';
import { PeerServer } from './../../../model/peer-server';
import { Util } from './../../../../utils/util';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { VideoMultimediaComponent } from './../video-multimedia/video-multimedia.component';
import { Component, OnInit, Input } from '@angular/core';
import { PeerClient } from 'src/app/aula-virtual/model/peer-client';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css']
})
export class BotonesComponent implements OnInit {
  @Input() htmlVideo: VideoMultimediaComponent;
  room: Room;
  programacion: ProgramacionHorario;
  constructor(private socket: SocketIoClientService) {

  }

  ngOnInit(): void {
    this.socket.getProgramacion$().subscribe(data => this.programacion = data);
    this.socket.getRoom$().subscribe(data => this.room = data);
  }

  async start() {

    await this.htmlVideo.starTransmision();
    const stream = this.htmlVideo.video.stream;
    if (!Util.empty(this.room) && !Util.empty(this.room.usuarios) && this.room.usuarios.length > 0) {
      for (const element of this.room.peerServerEmisorReceptor) {
        if (element.emisor.id === Sesion.user().id) {
          const peerServer = element.peerServer;
          this.htmlVideo.video.video.srcObject = stream;
          this.htmlVideo.video.video.play();
          stream.getTracks().forEach((track: any) => {
            peerServer.peerConnection.addTrack(track, stream);
          });
          await peerServer.createOffer();
          element.peerServer = peerServer;
        }
      }
      console.log('click boton');
      console.log(this.room);
      this.socket.emit('createAnswer', { id: this.room.id, peerServerEmisorReceptor: this.room.peerServerEmisorReceptor});
    }
  }
}
