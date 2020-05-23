import { Component, OnInit} from '@angular/core';
import { SocketIoClientService } from 'src/app/aula-virtual/service/socket-io-client.service';

@Component({
  selector: 'app-usuario-multimedia',
  templateUrl: './usuario-multimedia.component.html',
  styleUrls: ['./usuario-multimedia.component.css']
})
export class UsuarioMultimediaComponent implements OnInit {
  btnCamera = false;
  btnMicrofono = false;
  startHilo = true;
  audio: boolean;
  cam: boolean;
  width = 500;
  height = 400;
  video = document.createElement('video') as HTMLVideoElement;
  canvas = document.createElement('canvas') as HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  stream: any;
  peerConnection: any;
  // video: HTMLVideoElement;
  // @ViewChild('videoElement')
  // set mainVideoEl(el: ElementRef) {
  //   this.video = el.nativeElement;
  // }
  constructor(
    private socketService: SocketIoClientService,
  ) {

    this.agregarPrototypeWindow();
  }

  ngOnInit(): void {
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
    this.cam = !this.cam;
    this.init();
  }

  init() {

    if (this.cam && this.audio) {
      this.initCamera({ video: this.cam, audio: this.audio });
    } else if (this.cam && !this.audio) {
      this.initCamera({ video: this.cam, audio: this.audio });
    } else if (!this.cam && !this.audio) {
      this.stop();
    } else if (!this.cam && this.audio) {
      this.stop();
      this.initCamera({ video: false, audio: this.audio });
    }

  }

  initCamera(config: any) {

    this.startHilo = true;
    // this.video.style.display = 'none';

    const browser = <any>navigator;
    // this.canvas.width = 200;
    // this.canvas.height = 200;

    this.context = this.canvas.getContext('2d');
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.srcObject = stream;
      // this.videos.srcObject = stream;
      this.stream = stream;
      stream.getTracks().forEach(track => this.peerConnection.addTrack(track, stream));
      // this.socketService.emit('streaming-cam', {id: '1', streaming: stream });
      this.video.play();
      // this.videos.play();
    });
    // this.streamVideo();
  }

  streamVideo() {
    const outputStream = this.canvas.toDataURL('image/jpeg', 0.2);
    this.socketService.emit('streaming-cam', { id: '1', streaming: outputStream });
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    this.context.drawImage(this.video, 0, 0, this.width, this.height);

    (window as any).playVideo(() => {
      if (this.startHilo) {
        this.streamVideo();
      } else {
        return;
      }
    });
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


}
