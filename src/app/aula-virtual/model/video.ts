export class Video {
  btnCamera = false;
  btnMicrofono = false;
  width = 670;
  height = 500;
  audio = false;
  videoCam = false;
  stream: any;
  constructor(public video: HTMLVideoElement) {

  }
  async audioTrack() {
    this.audio = !this.audio;
    if (this.stream.getTracks() !== undefined && this.stream.getAudioTracks().length > 0) {
      this.stream.getAudioTracks()[0].enabled = this.audio;
    }
    this.stop();
    this.stream = await this.getUserMedia({ video: this.videoCam, audio: this.audio });
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
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);
    return await browser.mediaDevices.getUserMedia(config);
  }

  async start(config: any) {
    const browser = navigator as any;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);
    const stream = await this.getUserMedia(config);
    this.stream = stream;
  }
}
