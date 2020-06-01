import { PeerClient } from './../../../model/peer-client';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { PeerServer } from './../../../model/peer-server';
import { Room } from './../../../model/room';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ListRoomService } from './../../../service/list-room.service';
import { ProgramacionHorarioService } from '../../../../dashboard/service/dashboard/programacion-horario.service';
import { Sesion } from 'src/app/utils/sesion';
import { Util } from '../../../../utils/util';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IncripcionAsigEs } from 'src/app/dashboard/modelo/incripcion-asig-es';
import { ProgramacionHorario } from 'src/app/dashboard/modelo/programacion-horario';

@Component({
  selector: 'app-plantilla-chat',
  templateUrl: './plantilla-chat.component.html',
  styleUrls: ['./plantilla-chat.component.css']
})
export class PlantillaChatComponent implements OnInit {

  incripcionAsigEs: IncripcionAsigEs;
  programacionHorario: ProgramacionHorario;
  data: any;
  room: Room;
  peerServer: PeerServer;
  usuario: Usuario;
  constructor(
    private socket: SocketIoClientService,
    private service: ListRoomService,
    private serviceProgramacion: ProgramacionHorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private overlay: OverlayContainer,
  ) {
    this.peerServer = new PeerServer();
    this.peerServer.addOffer();
    this.socket.addPeerServer$(this.peerServer);
    this.room = new Room();
    if (!this.overlay.getContainerElement().classList.contains('theme-light')) {
      overlay.getContainerElement().classList.add('theme-light');
      document.body.classList.add('theme-light');
    }
    this.usuario = new Usuario();

    const user = Sesion.user();

    this.usuario.email = user.email;
    this.usuario.id = user.id;
    this.usuario.nombre = user.nombre;
    this.usuario.tipo = user.tipo;
    this.usuario.cedula = user.cedula;
    this.usuario.foto = user.foto;
    this.usuario.sex = user.sex;
    this.usuario.rol = user.rol;
    this.usuario.peerServer = this.peerServer;

    this.route.paramMap.subscribe(params => {
      const compoundKey = params.get('compoundKey');
      if (!Util.empty(compoundKey)) {
        if (Sesion.user().tipo === 'ES') {
          if (Util.empty(this.service.listPagination$)) {
            this.service.get('incripcion-horario-estudiante/get',
              compoundKey.split(',')[0] + ',' + compoundKey.split(',')[1]).subscribe(
                res => {
                  this.incripcionAsigEs = res['data'];
                  this.socket.emit('livingRoom', { programacion: this.incripcionAsigEs.programacion, usuario: this.usuario });
                }
              );
          } else {
            this.incripcionAsigEs = this.service.buscarElementList$({ id: compoundKey });
            if (Util.empty(this.incripcionAsigEs)) {
              this.router.navigate(['../../../aula-virtual']);
            } else {
              this.socket.emit('livingRoom', { programacion: this.incripcionAsigEs.programacion, usuario: this.usuario });
            }
          }
        } else {
          if (Sesion.user().tipo === 'PR') {
            const idProgramacion = +compoundKey.split(',')[1];
            if (Util.empty(this.serviceProgramacion.listPagination$)) {
              this.serviceProgramacion.get('programacion-horario/get', idProgramacion).subscribe(
                res => {
                  this.programacionHorario = res['data'];
                  this.socket.emit('livingRoom', { programacion: this.programacionHorario, usuario: this.usuario });
                }
              );
            } else {
              this.programacionHorario = this.serviceProgramacion.buscarElementList$({ id: idProgramacion });

              if (Util.empty(this.programacionHorario)) {
                this.router.navigate(['../../../aula-virtual']);
              } else {
                this.socket.emit('livingRoom', { programacion: this.programacionHorario, usuario: this.usuario });
              }
            }
          } else {
            this.router.navigate(['../../../aula-virtual']);
          }
        }
      } else {
        this.router.navigate(['../../../aula-virtual']);
      }
    });


  }
  ngOnInit(): void {
    this.socket.$currentRoom.subscribe(
      res => {
        this.room = res;
        console.log('reciviendo room ....');
        this.connectionPeerProfesor(res);
        this.socket.addRoom$(res);
      }
    );

    this.socket.$answer.subscribe(data => {
      console.log('reciviendo profesor');
      console.log(data);
      this.peerServer.addAnswer(data.answer);
      this.socket.addPeerServer$(this.peerServer);
    });
  }

  async connectionPeerProfesor(room: any) {
    console.log('connection profesor ');
    console.log(room);
    if (!Util.empty(room)
      && Sesion.user().rol.tipo !== 'PR') {
      console.log('ciclo for buscar usuario');
      let usuarioAux: Usuario = null;
      console.log(room.usuarios);
      for (const user of room.usuarios) {
        console.log('buscando...');
        console.log(user.rol.tipo);
        if (user.rol.tipo === 'PR') {
          usuarioAux = user;
          break;
        }
      }
      console.log('usuarios conectadosss....');
      console.log(usuarioAux);
      if (!Util.empty(usuarioAux)) {
        console.log('cliente....');
        const peerClient = new PeerClient();
        // peerClient.addAnswer(usuarioAux.peerServer.offer);
        peerClient.peerConnection.setRemoteDescription(new RTCSessionDescription(usuarioAux.peerServer.offer));
        const answer = await peerClient.peerConnection.createAnswer();
        await peerClient.peerConnection.setLocalDescription(answer);
        peerClient.answer = answer;
        this.socket.addPeerClient$(peerClient);
        console.log('paso ya existe respuesta por parte del answer');
        if (Sesion.user().rol.tipo === 'ES') {
          this.socket.emit('answer', { programacion: this.incripcionAsigEs.programacion, peer: peerClient, usuario: usuarioAux });
        } else {
          this.socket.emit('answer', { programacion: this.programacionHorario, peer: peerClient, usuario: usuarioAux });
        }
      }
    }
  }
}


