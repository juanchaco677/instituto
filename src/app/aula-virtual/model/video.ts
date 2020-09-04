import { Util } from './../../utils/util';
import { utils } from 'protractor';
export class Video {
  btnCamera = false;
  btnMicrofono = false;
  width = 670;
  height = 500;
  audio = false;
  videoCam = false;
  audioDesktop = false;
  videoDesktop = false;
  stream: any;
  constructor(public camDesktop: number, public video: HTMLVideoElement) {

  }

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
    if (this.videoCam || this.audio) {
      const browser = navigator as any;
      browser.getUserMedia =
        browser.getUserMedia ||
        browser.webkitGetUserMedia ||
        browser.mozGetUserMedia ||
        browser.msGetUserMedia;
      return await browser.mediaDevices.getUserMedia(config);
    }
  }
  async getDisplayMedia(config: any) {
    const browser = navigator as any;
    browser.getDisplayMedia =
      browser.getDisplayMedia ||
      browser.webkitGetDisplayMedia ||
      browser.mozGetDisplayMedia ||
      browser.msGetDisplayMedia;
    return await browser.mediaDevices.getDisplayMedia(config);
  }


  async initCamera(config: any) {
    switch (this.camDesktop) {
      case 1:
        this.stream = await this.getUserMedia(config);
        break;
      default:
        this.stream = await this.getDisplayMedia(config);
        break;
    }
    this.video.srcObject = this.stream;
  }

  async startVideo() {
    this.videoCam = !this.videoCam;
    await this.initCamera({
      video: this.videoCam,
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
    } else {
      await this.initCamera({
        video: this.videoCam,
        audio: this.audio,
      });
    }
  }
}
