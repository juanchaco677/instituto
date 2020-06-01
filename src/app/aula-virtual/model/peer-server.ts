export class PeerServer {
  configuration = {  iceServers: [{ urls: 'stun:stun.test.com:19000' }], };
  peerConnection: RTCPeerConnection;
  offer: any;

  constructor() {
    this.peerConnection = new RTCPeerConnection(this.configuration);
  }

  async addOffer() {

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.offer = offer;
  }

  async addAnswer(answer: any) {
    const remoteDesc = new RTCSessionDescription(answer);
    await this.peerConnection.setRemoteDescription(remoteDesc);
  }

  addStreamVideo(stream: any, track: any) {
    this.peerConnection.addTrack(track, stream);
  }

  getOntrack() {
    this.peerConnection.ontrack = (event) => {
      return event.streams[0];
    };
    return null;
  }

}
