import io from 'socket.io-client';

export class WebSocketService {
  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => console.log('Connectado ao websocket server'));
    this.socket.on('disconnect', () => console.log('Desconectado do websocket server'));
  }

  on(eventName, callback) {
    this.socket.on(eventName, callback);
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data);
  }

}