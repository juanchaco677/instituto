import { VideoMultimediaComponent } from './../video-multimedia/video-multimedia.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesktopMultimediaComponent } from './../desktop-multimedia/desktop-multimedia.component';
import { PeerClient } from 'src/app/aula-virtual/model/peer-client';
import { PeerServer } from 'src/app/aula-virtual/model/peer-server';
import { Router } from '@angular/router';
import { Video } from './../../../model/video';
import { Sesion } from 'src/app/utils/sesion';
import { Usuario } from './../../../model/usuario';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { Util } from './../../../../utils/util';
import { BotonesService } from './../../../service/botones.service';
import { Component, OnInit, Input } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css'],
})
export class BotonesComponent implements OnInit {
  @Input() visible = true;
  @Input() htmlListVideo: any;
  @Input() htmlVideoDesktop: DesktopMultimediaComponent;
  @Input() videoMultimedia: VideoMultimediaComponent;
  cam = false;
  audio = false;
  desktop = false;
  hand = false;
  record = false;
  visibleCompartir = false;
  sidenaV = false;
  visibleComentario = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  room = new Room(null, {}, [], {}, {}, {}, {});
  usuario: Usuario;
  peerServer: PeerServer;
  window = window;
  constructor(
    private botones: BotonesService,
    private socket: SocketIoClientService,
    public router: Router,
    public snackBar: MatSnackBar
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
    this.socket.getListenRecord().subscribe((data) => this.listenPeer(data));
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
    this.sidenaV = !this.sidenaV;
    this.botones.addSidenav(true);
  }

  async start(stream: any, streamAudio: any) {
    let concatenar = [];
    concatenar = concatenar.concat(stream.getVideoTracks());
    concatenar = concatenar.concat(streamAudio.getAudioTracks());
    const mediaStream = new MediaStream(concatenar);
    for (const track of mediaStream.getTracks()) {
      this.peerServer.peerConnection.addTrack(track, mediaStream);
    }

    await this.peerServer.createOffer();
    this.room.peerRecord[1].peerServer = this.peerServer;
    this.room.peerRecord[1].peerClient = new PeerClient();
    const programacion = Sesion.getProgramacion();
    this.socket.emit('createAnswer', {
      data: this.peerServer.localDescription,
      id: this.room.id,
      camDesktop: true,
      usuarioOrigen: this.room.peerRecord[1].usuario1,
      usuarioDestino: this.room.peerRecord[1].usuario2,
      record: true,
      biblioteca: {
        id_usuario: this.usuario.id,
        id_programacion_horario: programacion.id,
        id_salon: programacion.salon.id,
      },
    });
  }

  async starRecord() {
    this.record = !this.record;
    if (this.record) {
      Util.openSnackBarDuration(
        this.snackBar,
        'Grabando Clase...',
        1,
        'bottom',
        2000
      );
      this.socket.addListenRecord(true);
      this.peerServer = new PeerServer();
      this.peerServer.createDataChannel('recording');
      if (
        !Util.empty(this.htmlVideoDesktop) &&
        !Util.empty(this.htmlVideoDesktop.videoBoton) &&
        this.htmlVideoDesktop.videoBoton.desktop &&
        !Util.empty(this.htmlVideoDesktop.video.stream) &&
        !Util.empty(this.htmlVideoDesktop.video.stream.getVideoTracks()) &&
        this.htmlVideoDesktop.video.stream.getVideoTracks().length > 0 &&
        this.htmlVideoDesktop.video.stream.getVideoTracks()[0].getSettings()
          .displaySurface
      ) {
        const displaySurface = this.htmlVideoDesktop.video.stream
          .getVideoTracks()[0]
          .getSettings().displaySurface;
        if (displaySurface === 'monitor') {
          this.room.peerRecord[1].stream = this.htmlVideoDesktop.video.stream;
          await this.start(
            this.htmlVideoDesktop.video.stream,
            this.videoMultimedia.video.stream
          );
          this.socket.addRoom$(this.room);
        } else {
          const video = new Video(null, null);
          this.room.peerRecord[1].stream = await video.getDisplayMedia({
            video: true,
            audio: false,
          });
          const audio = new Video(null, null);
          audio.audio = true;
          this.room.peerRecord[1].streamAudio = await audio.getUserMedia({
            video: false,
            audio: true,
          });
          await this.start(
            this.room.peerRecord[1].stream,
            this.room.peerRecord[1].streamAudio
          );
          this.socket.addRoom$(this.room);
          this.socket.addListenRecord(true);
        }
      } else {
        const video = new Video(null, null);
        this.room.peerRecord[1].stream = await video.getDisplayMedia({
          video: true,
          audio: false,
        });
        const audio = new Video(null, null);
        audio.audio = true;
        this.room.peerRecord[1].streamAudio = await audio.getUserMedia({
          video: false,
          audio: true,
        });
        await this.start(
          this.room.peerRecord[1].stream,
          this.room.peerRecord[1].streamAudio
        );
        this.socket.addRoom$(this.room);
        this.socket.addListenRecord(true);
      }
    } else {
      this.room.peerRecord[1].peerServer.close();
      if (
        !Util.empty(this.room.peerRecord[1].stream.getAudioTracks()) &&
        this.room.peerRecord[1].stream.getAudioTracks().length > 0
      ) {
        this.room.peerRecord[1].stream
          .getAudioTracks()
          .forEach((track) => track.stop());
      }
      this.room.peerRecord[1].stream
        .getVideoTracks()
        .forEach((track) => track.stop());
      const programacion = Sesion.getProgramacion();
      this.socket.emit('stopRecordS', {
        id: this.room.id,
        usuarioDestino: this.room.peerRecord[1].usuario2,
        biblioteca: {
          id_usuario: this.usuario.id,
          id_programacion_horario: programacion.id,
          id_salon: programacion.salon.id,
        },
      });
    }
  }

  redistribuir(opcion: string) {
    this.botones.add(Util.redistribuir[opcion]);
  }

  close() {
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

  listenPeer(data: any) {
    if (!Util.empty(data) && data && !Util.empty(this.peerServer)) {
      this.peerServer.peerConnection.onicecandidate = (event: any) =>
        this.getIceCandidate(event);

      this.peerServer.dataChannel.onerror = (error) => {
        console.log('Data Channel Error:', error);
      };

      this.peerServer.dataChannel.onopen = () => {
        this.peerServer.send('conectados record..');
      };

      this.peerServer.dataChannel.onclose = () => { };

      this.peerServer.peerConnection.ondatachannel = () => { };
    }
  }

  getIceCandidate(event: any) {
    if (event.candidate) {
      const programacion = Sesion.getProgramacion();
      this.socket.emit('createAnswer', {
        data: event.candidate,
        id: this.room.id,
        camDesktop: true,
        usuarioOrigen: this.room.peerRecord[1].usuario1,
        usuarioDestino: this.room.peerRecord[1].usuario2,
        record: true,
        biblioteca: {
          id_usuario: this.usuario.id,
          id_programacion_horario: programacion.id,
          id_salon: programacion.salon.id,
        },
      });
    }
  }

  goBack() {
    if (!Util.empty(this.videoMultimedia.video.stream)) {
      console.log('pausando stream todo..');
      this.videoMultimedia.video.stop();
    }
    this.router.navigate(['../../../aula-virtual']);
  }
}
