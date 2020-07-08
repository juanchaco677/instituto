import { Util } from './../../utils/util';
import { utils } from 'protractor';
export class Video {
  btnCamera = false;
  btnMicrofono = false;
  width = 670;
  height = 500;
  audio = false;
  videoCam = false;
  stream: any;
  constructor(public video: HTMLVideoElement) {}
  async audioTrack() {
    this.audio = !this.audio;
    if (
      this.stream.getTracks() !== undefined &&
      this.stream.getAudioTracks().length > 0
    ) {
      this.stream.getAudioTracks()[0].enabled = this.audio;
    }
    this.stop();
    this.stream = await this.getUserMedia({
      video: this.videoCam,
      audio: this.audio,
    });
  }

  pauseAudioTrack() {
    this.stream.getAudioTracks()[0].enabled = !this.stream.getAudioTracks()[0]
      .enabled;
  }
  pauseVideoTrack() {
    this.stream.getVideoTracks()[0].enabled = !this.stream.getVideoTracks()[0]
      .enabled;
  }
  pauseStream() {
    this.stream.getTracks()[0].enabled = true;
  }

  stop() {
    if (!Util.empty(this.stream)) {
      this.stream.getTracks().forEach((track: any) => {
        track.stop();
      });
      this.pause();
      this.video.srcObject = null;
      this.stream = null;
    }
  }
  pause() {
    this.video.pause();
  }

  resume() {
    this.video.play();
  }

  async getUserMedia(config: any) {
    const browser = navigator as any;
    browser.getUserMedia =
      browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia;
    return await browser.mediaDevices.getUserMedia(config);
  }

  async initCamera(config: any) {
    const browser = navigator as any;
    browser.getUserMedia =
      browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia;
    const stream = await this.getUserMedia(config);
    this.stream = stream;
    this.video.srcObject = stream;

  }

  async startVideo() {
    this.videoCam = !this.videoCam;
    await this.initCamera({
      video: this.videoCam ? {
        width: 900,
        height: 1200,
      } : false,
      audio: this.audio,
    });
  }

  async startMic() {
    this.audio = !this.audio;
    if (
      !Util.empty(this.stream) &&
      !Util.empty(this.stream.getAudioTracks()) &&
      this.stream.getAudioTracks().length > 0
    ) {
      this.pauseAudioTrack();
      console.log(this.stream);
    } else {
      await this.initCamera({
        video: this.videoCam ? {
          width: 900,
          height: 1200,
        } : false,
        audio: this.audio,
      });
      console.log(this.stream);
    }
  }

}
