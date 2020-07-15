export class PeerClient {
  config = {
    iceServers: [
      {
        urls: 'stun:181.55.192.137:3478',
        username: 'cony',
        password: 'juancamilo65',
      },
    ],
    sdpSemantics: 'unified-plan',
  };
  peerConnection: RTCPeerConnection;
  answer: any;
  receiveChannel: any;
  dataChannel: any;
  localDescription: any;
  constructor() {
    this.peerConnection = new RTCPeerConnection(this.config);
  }

  addStreamVideo(stream: any, track: any) {
    this.peerConnection.addTrack(track, stream);
  }

  async createAnswer(localDescription: any) {
    try {
      await this.peerConnection.setRemoteDescription(localDescription);
      await this.peerConnection.setLocalDescription(
        await this.peerConnection.createAnswer()
      );
      this.localDescription = this.peerConnection.localDescription;
    } catch (error) {}
  }

  createDataChannel(nameChannel: string) {
    this.dataChannel = this.peerConnection.createDataChannel(nameChannel);
    this.dataChannel.onopen = (event: any) => {
      if (this.dataChannel) {
        if (this.dataChannel.readyState === 'open') {
          console.log('canal abierto client');
        } else {
          console.log('canal cerrado client');
        }
      }
    };

    this.dataChannel.onclose = (event: any) => {
      if (this.dataChannel) {
        if (this.dataChannel.readyState === 'open') {
          console.log('canal abierto cerrado client');
        } else {
          console.log('canal cerrado cerrado client');
        }
      }
    };
  }

  send(data: any) {
    this.dataChannel.send(data);
  }

  closeSendDataChannel() {
    this.dataChannel.close();
  }

  closeReciveDataChannel() {
    this.receiveChannel.close();
  }

  close() {
    this.peerConnection.close();
  }
}
