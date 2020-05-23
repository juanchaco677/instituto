import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-display-media',
  templateUrl: './display-media.component.html',
  styleUrls: ['./display-media.component.css']
})
export class DisplayMediaComponent implements OnInit {
  btnCamera = false;
  btnMicrofono = false;
  @ViewChild('deskopComponent') desktopComponent;
  private context: CanvasRenderingContext2D;
  desktop = true;
  width = 670;
  height = 500;
  startHilo = true;
  logs = [];
  video: HTMLVideoElement;
  videoDesktop: HTMLVideoElement;
  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    this.video = el.nativeElement;
  }
  @ViewChild('canvasEl') canvas: ElementRef;

  audio = false;
  @Input() videoCam = false;

  isPlaying = false;

  displayControls = true;

  stream: any;
  streamDesktop: any;

  constructor() {
    this.agregarPrototypeWindow();
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
      // this.context.fillStyle = '#fff';
      // tslint:disable-next-line: max-line-length
      this.context.canvas.width = 0;
      this.context.canvas.height = 0;
    }
  }

  initCamera(config: any) {
    this.startHilo = true;
    this.video.style.display = 'none';
    const browser = <any>navigator;

    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.srcObject = stream;
      this.stream = stream;
      this.video.play();
    });
    this.streamVideo();
  }

  streamVideo() {
    const outputStream = (this.canvas.nativeElement as HTMLCanvasElement).toDataURL('image/jpeg');
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    this.context.drawImage(this.video, 0, 0, this.width , this.height);
    (window as any).playVideo(() => {
      if (this.startHilo) {
        this.streamVideo();
      } else {
        return;
      }
    });
  }

  startDesktop() {
    this.init();
    this.desktopComponent.start();
    this.desktop = false;
  }

  stopDesktop() {
    this.desktop = true;
    this.desktopComponent.stop();
    this.init();
  }
  recive(desktop) {
    this.desktop = desktop;
  }
}
