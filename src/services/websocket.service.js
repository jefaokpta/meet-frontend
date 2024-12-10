import io from 'socket.io-client';

export class WebSocketService {
  constructor() {
    this.socket = null;
    this.connect()
  }

  connect() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(message) {
    this.socket.send(message);
  }
}