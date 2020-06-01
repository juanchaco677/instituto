import { Util } from './../../utils/util';
import { utils } from 'protractor';

export class PeerClient {

  configuration = {   iceServers: [{ urls: 'stun:stun.test.com:19000' }]};
  peerConnection: RTCPeerConnection;
  answer: any;
  constructor(){
    this.peerConnection = new RTCPeerConnection(this.configuration);
  }

  async addAnswer(offer: any) {
    console.log('clienteeeeeeeeeeeee');
    console.log(offer);
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    console.log('respuestaaaaaaaaaaa');
    console.log(answer);
    this.answer = answer;
  }



  getOntrack() {
    this.peerConnection.ontrack = (event) => {
      console.log('entro al ontrack');
      return event.streams[0];
    };
    return null;
  }


}
