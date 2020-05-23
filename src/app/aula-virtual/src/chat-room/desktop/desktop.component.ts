import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  private context: CanvasRenderingContext2D;
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

  @ViewChild('canvasEll') canvas: ElementRef;

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
    this.video.style.display = 'none';
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.logs = [];

    const displayMediaOptions = {
      video: {
        width: this.width,
        height: this.height,
        frameRate: 100,
      },
      audio: true,
    };

    const browser = navigator as any;
    const objetoMedia = browser.mediaDevices.getDisplayMedia(displayMediaOptions).then(stream => {

      this.video.srcObject = stream;
      this.stream = stream;
      this.video.play();
    });
    this.streamVideo();
  }



  streamVideo() {
    const outputStream = (this.canvas.nativeElement as HTMLCanvasElement).toDataURL('image/jpeg', 1.0);
    // this.context.mozImageSmoothingEnabled = false;  // firefox
    this.context.imageSmoothingEnabled = false;
    const pixelRatio = window.devicePixelRatio || 1;
    // console.log(pixelRatio);
    // this.context.scale( 0.25 ,  0.25);
    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
    // const scaledImage: any = this.downScaleImage(0.99);
    // console.log(scaledImage);
    // this.context.drawImage(scaledImage, 0, 0, this.width, this.height);
    this.context.drawImage(this.video, 0, 0, this.width, this.height);
    (window as any).playVideo(() => {
      if (this.startHilo) {
        this.streamVideo();
      } else {
        return;
      }
    });
  }
  downScaleImage(scale) {
    const imgCV = document.createElement('canvas') as HTMLCanvasElement;

    imgCV.width = this.width;
    imgCV.height = this.height;
    const imgCtx = imgCV.getContext('2d');
    imgCtx.drawImage(this.video, 0, 0);
    return this.downScaleCanvas(imgCV, scale);
  }



  stop() {
    if (this.stream !== null && this.stream !== undefined
      && this.stream.getTracks() !== undefined
    ) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
      this.video.srcObject = null;
      this.startHilo = false;
      this.context.canvas.width = 0;
      this.context.canvas.height = 0;
    }
  }

  pause() {
    this.video.pause();
  }

  resume() {
    this.video.play();
  }

  downScaleCanvas(cv, scale) {
    if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
    scale = this.normaliseScale(scale);
    let sqScale = scale * scale; // square scale =  area of a source pixel within target
    let sw = cv.width; // source image width
    let sh = cv.height; // source image height
    let tw = Math.floor(sw * scale); // target image width
    let th = Math.floor(sh * scale); // target image height
    let sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
    let tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
    let tX = 0, tY = 0; // rounded tx, ty
    let w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
    // weight is weight of current source point within target.
    // next weight is weight of current source point within next target's point.
    let crossX = false; // does scaled px cross its current px right border ?
    let crossY = false; // does scaled px cross its current px bottom border ?
    let sBuffer = cv.getContext('2d').
      getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
    let tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
    let sR = 0, sG = 0, sB = 0; // source's current point r,g,b

    for (sy = 0; sy < sh; sy++) {
      ty = sy * scale; // y src position within target
      tY = 0 | ty;     // rounded : target pixel's y
      yIndex = 3 * tY * tw;  // line index within target array
      crossY = (tY !== (0 | (ty + scale)));
      if (crossY) { // if pixel is crossing botton target pixel
        wy = (tY + 1 - ty); // weight of point within target pixel
        nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
      }
      for (sx = 0; sx < sw; sx++, sIndex += 4) {
        tx = sx * scale; // x src position within target
        tX = 0 | tx;    // rounded : target pixel's x
        tIndex = yIndex + tX * 3; // target pixel index within target array
        crossX = (tX !== (0 | (tx + scale)));
        if (crossX) { // if pixel is crossing target pixel's right
          wx = (tX + 1 - tx); // weight of point within target pixel
          nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
        }
        sR = sBuffer[sIndex];   // retrieving r,g,b for curr src px.
        sG = sBuffer[sIndex + 1];
        sB = sBuffer[sIndex + 2];
        if (!crossX && !crossY) { // pixel does not cross
          // just add components weighted by squared scale.
          tBuffer[tIndex] += sR * sqScale;
          tBuffer[tIndex + 1] += sG * sqScale;
          tBuffer[tIndex + 2] += sB * sqScale;
        } else if (crossX && !crossY) { // cross on X only
          w = wx * scale;
          // add weighted component for current px
          tBuffer[tIndex] += sR * w;
          tBuffer[tIndex + 1] += sG * w;
          tBuffer[tIndex + 2] += sB * w;
          // add weighted component for next (tX+1) px
          nw = nwx * scale
          tBuffer[tIndex + 3] += sR * nw;
          tBuffer[tIndex + 4] += sG * nw;
          tBuffer[tIndex + 5] += sB * nw;
        } else if (!crossX && crossY) { // cross on Y only
          w = wy * scale;
          // add weighted component for current px
          tBuffer[tIndex] += sR * w;
          tBuffer[tIndex + 1] += sG * w;
          tBuffer[tIndex + 2] += sB * w;
          // add weighted component for next (tY+1) px
          nw = nwy * scale
          tBuffer[tIndex + 3 * tw] += sR * nw;
          tBuffer[tIndex + 3 * tw + 1] += sG * nw;
          tBuffer[tIndex + 3 * tw + 2] += sB * nw;
        } else { // crosses both x and y : four target points involved
          // add weighted component for current px
          w = wx * wy;
          tBuffer[tIndex] += sR * w;
          tBuffer[tIndex + 1] += sG * w;
          tBuffer[tIndex + 2] += sB * w;
          // for tX + 1; tY px
          nw = nwx * wy;
          tBuffer[tIndex + 3] += sR * nw;
          tBuffer[tIndex + 4] += sG * nw;
          tBuffer[tIndex + 5] += sB * nw;
          // for tX ; tY + 1 px
          nw = wx * nwy;
          tBuffer[tIndex + 3 * tw] += sR * nw;
          tBuffer[tIndex + 3 * tw + 1] += sG * nw;
          tBuffer[tIndex + 3 * tw + 2] += sB * nw;
          // for tX + 1 ; tY +1 px
          nw = nwx * nwy;
          tBuffer[tIndex + 3 * tw + 3] += sR * nw;
          tBuffer[tIndex + 3 * tw + 4] += sG * nw;
          tBuffer[tIndex + 3 * tw + 5] += sB * nw;
        }
      } // end for sx
    } // end for sy
    var resCV = document.createElement('canvas');
    resCV.width = tw;
    resCV.height = th;
    var resCtx = resCV.getContext('2d');
    var imgRes = resCtx.getImageData(0, 0, tw, th);
    var tByteBuffer = imgRes.data;
    // convert float32 array into a UInt8Clamped Array
    var pxIndex = 0; //
    for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
      tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
      tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
      tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
      tByteBuffer[tIndex + 3] = 255;
    }
    // writing result to canvas.
    resCtx.putImageData(imgRes, 0, 0);
    return resCV;
  }
  normaliseScale(s) {
    if (s > 1) throw ('s must be <1');
    s = 0 | (1 / s);
    let l = this.log2(s);
    let mask = 1 << l;
    let accuracy = 4;
    while (accuracy && l) { l--; mask |= 1 << l; accuracy--; }
    return 1 / (s & mask);
  }


  log2(v) {
    // taken from http://graphics.stanford.edu/~seander/bithacks.html
    let b = [0x2, 0xC, 0xF0, 0xFF00, 0xFFFF0000];
    let S = [1, 2, 4, 8, 16];
    let i = 0, r = 0;

    for (i = 4; i >= 0; i--) {
      if (v & b[i]) {
        v >>= S[i];
        r |= S[i];
      }
    }
    return r;
  }

}
