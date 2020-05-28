import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  startHilo = true;
  @Input() stopHidden: boolean;
  @Output() out = new EventEmitter<boolean>();
  width = 670;
  height = 500;
  logs = [];
  video: HTMLVideoElement;
  stream: any;
  @ViewChild('videoElementt')
  set mainVideoEl(el: ElementRef) {
    this.video = el.nativeElement;
  }

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

  async start() {
    this.startHilo = true;
    this.logs = [];

    const displayMediaOptions = {
      video: true,
      audio: true,
    };

    const browser = navigator as any;
    const objetoMedia = browser.mediaDevices.getDisplayMedia(displayMediaOptions).then(stream => {

      this.video.srcObject = stream;
      this.stream = stream;
      this.video.play();
    });
  }
  stop() {
    if (this.stream !== null && this.stream !== undefined
      && this.stream.getTracks() !== undefined
    ) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
      this.video.srcObject = null;
      this.startHilo = false;
    }
  }

  pause() {
    this.video.pause();
  }

  resume() {
    this.video.play();
  }


}
