import { Util } from './../../../../utils/util';
import { SocketIoClientService } from './../../../service/socket-io-client.service';
import { PeerClient } from './../../../model/peer-client';
import { PeerServer } from './../../../model/peer-server';
import { Video } from './../../../model/video';

import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-video-multimedia',
  templateUrl: './video-multimedia.component.html',
  styleUrls: ['./video-multimedia.component.css']
})
export class VideoMultimediaComponent implements OnInit {
  @Input() width = '300px';
  @Input() height = '250px';
  @Input() tipo: string = null;
  @Input() transmiteRecive: boolean;
  @Input() peerServer: PeerServer;
  @Input() peerClient: PeerClient;
  message: string;
  texto: string;
  video: Video;
  @ViewChild('videoElement')
  set mainVideoEl(el: ElementRef) {
    this.video = new Video(el.nativeElement);
  }
  constructor(private socket: SocketIoClientService) {

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(){
    if (!Util.empty(this.tipo)) {
      // console.log('entro al oninit');
      switch (this.tipo) {
        case 'S':
          // console.log('escuchando al cliente...');
          this.peerServer.peerConnection.ontrack = e => {
            console.log('entro a transmitir video peer client');
            this.video.video.srcObject = e.streams[0];
            this.video.video.play();
          };

          this.peerServer.peerConnection.ondatachannel = (event) => {
            this.peerServer.receiveChannel = event.channel;
            this.peerServer.receiveChannel.onmessage = (e: any) => {
              this.message = e.data;
              console.log('message => ' + this.message);
            };
          };

          break;
        case 'C':
          // console.log('escuchando al server...');
          this.peerClient.peerConnection.ontrack = e => {
            console.log('entro a transmitir video peer client');
            this.video.video.srcObject = e.streams[0];
            this.video.video.play();
          };

          this.peerClient.peerConnection.ondatachannel = (event) => {
            this.peerClient.receiveChannel = event.channel;
            this.peerClient.receiveChannel.onmessage = (e: any) => {
              this.message = e.data;
              console.log('message => ' + this.message);
            };
          };
          break;
      }
    }
  }

  ngOnInit(): void {

  }

  async starTransmision() {
    this.video.videoCam = !this.video.videoCam;
    await this.video.start({ video: this.video.videoCam, audio: true });
  }

}
