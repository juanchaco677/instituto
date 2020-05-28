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
  @Input() width ;
  @Input() height ;
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
      this.initCamera({ video: this.video, audio: this.audio });
    } else if (this.videoCam && !this.audio) {
      this.initCamera({ video: this.video, audio: this.audio });
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
    });
  }


}
