import { PeerClient } from './../../../model/peer-client';
import { Sesion } from 'src/app/utils/sesion';
import { Usuario } from 'src/app/aula-virtual/model/usuario';
import { Util } from 'src/app/utils/util';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';
import { PeerServer } from './../../../model/peer-server';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-display-media',
  templateUrl: './display-media.component.html',
  styleUrls: ['./display-media.component.css']
})
export class DisplayMediaComponent implements OnInit {

  @Output() btnCamera = false;
  @Output() btnMicrofono = false;
  @ViewChild('deskopComponent') desktopComponent;
  private context: CanvasRenderingContext2D;
  @Input() width: string;
  @Input() height: string;
  widthV: 750;
  heightV: 600;
  startHilo = true;
  logs = [];
  video: HTMLVideoElement;
  videoDesktop: HTMLVideoElement;
  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    this.video = el.nativeElement;
  }
  // @ViewChild('canvasEl') canvas: ElementRef;

  audio = false;
  @Input() videoCam = false;

  isPlaying = false;

  displayControls = true;

  stream: any;
  streamDesktop: any;
  peerServer: PeerServer;
  PeerClient: PeerClient;

  constructor(
    private socket: SocketIoClientService
  ) {
    this.agregarPrototypeWindow();
    this.consultarPeerServer();
  }



  consultarPeerServer() {
    this.socket.getPeerServer$().subscribe(
      data => this.peerServer = data
    );
  }

  agregarPrototypeWindow() {
    (window as any).playVideo = ((cb) => {
      return (window as any).requestAnimationFrame ||
        (window as any).webkitRequestAnimationFrame ||
        (window as any).mozRequestAnimationFrame ||
        (window as any).msRequestAnimationFrame ||
        function (cb) {
          (window as any).setTimeout(cb, 1000 / 100)
        };
    })();
  }

  ngOnInit() {

    this.consultarPeerClient();

  }
  consultarPeerClient() {
    console.log('transmitiendo el servidor para los clientes');
    console.log(this.socket.peerClient$);
    if (!Util.empty(this.socket.peerClient$.getValue())) {
      console.log('transmitiendo el servidor para los clientes');
      this.socket.getPeerClient$().subscribe(
        peer => {
          const p: PeerClient = peer;
          console.log('entro a transmitir el cliente lo del servidor');
          console.log(this.video);
          console.log(peer);
          p.peerConnection.ontrack = (event) => {
            console.log('entro al ontrack');
            this.video.srcObject = event.streams[0];
            this.video.play();
          };

        }
      );
    }
  }

  start() {
    this.btnCamera = !this.btnCamera;
    this.videoCamObject();
  }

  pause() {
    this.video.pause();
  }

  resume() {
    this.video.play();
  }

  sound() {
    this.btnMicrofono = !this.btnMicrofono;
    this.audio = !this.audio;
    this.init();
  }

  videoCamObject() {
    this.videoCam = !this.videoCam;
    this.init();
  }

  init() {
    if (this.videoCam && this.audio) {
      this.initCamera({ video: { width: this.width, height: this.height }, audio: this.audio });
    } else if (this.videoCam && !this.audio) {
      this.initCamera({ video: { width: this.width, height: this.height }, audio: this.audio });
    } else if (!this.videoCam && !this.audio) {
      this.stop();
    } else if (!this.videoCam && this.audio) {
      this.stop();
      this.initCamera({ video: false, audio: this.audio });
    }
  }

  stop() {
    if (this.stream !== null && this.stream !== undefined
      && this.stream.getTracks() !== undefined
    ) {
      this.stream.getTracks().forEach((track: any) => {
        track.stop();
      });
      this.pause();
      this.video.src = '';
      this.startHilo = false;
    }
  }

  initCamera(config: any) {
    this.startHilo = true;
    // this.video.style.display = 'none';
    const browser = <any>navigator;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.srcObject = stream;
      this.stream = stream;
      this.video.play();
      this.stream.getTracks().forEach((track: any) => {
        this.peerServer.addStreamVideo(stream, track);

      });
    });
  }
}
