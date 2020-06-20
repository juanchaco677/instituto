export class PeerServer {
  config = {
    iceServers: [
      {
        urls: 'stun:181.55.192.137:3478',
        username: 'cony',
        password: 'juancamilo65',
      },
    ],
  };
  peerConnection: RTCPeerConnection;
  offer: any;
  dataChannel: any;
  receiveChannel: any;
  localDescription: any;
  constructor() {
    this.peerConnection = new RTCPeerConnection(this.config);
  }

  async createOffer() {
    await this.peerConnection.setLocalDescription(
      await this.peerConnection.createOffer()
    );
    this.localDescription = this.peerConnection.localDescription;
  }

  async addAnswer(localDescription: any) {
    await this.peerConnection.setRemoteDescription(localDescription);
  }

  createDataChannel(nameChannel: string) {
    this.dataChannel = this.peerConnection.createDataChannel(nameChannel);
    this.dataChannel.onopen = (event: any) => {
      if (this.dataChannel) {
        if (this.dataChannel.readyState === 'open') {
          console.log('canal abierto server');
        } else {
          console.log('canal cerrado server');
        }
      }
    };

    this.dataChannel.onclose = (event: any) => {
      if (this.dataChannel) {
        if (this.dataChannel.readyState === 'open') {
          console.log('canal abierto cerrado server');
        } else {
          console.log('canal cerrado cerrado server');
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
