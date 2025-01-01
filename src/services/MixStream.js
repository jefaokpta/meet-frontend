// src/services/MixStream.js
import MultiStreamsMixer from 'multistreamsmixer';

export class MixStream {
  constructor() {
    this.streams = [];
    this.mixer = null;
    this.recorder = null;
    this.chunks = [];
  }

  // Adiciona um novo stream à lista de streams e atualiza o mixer
  addStream(stream) {
    this.streams.push(stream);
    this._updateMixer();
  }

  // Remove um stream da lista de streams e atualiza o mixer
  removeStream(stream) {
    this.streams = this.streams.filter(s => s !== stream);
    this._updateMixer();
  }

  // Atualiza o mixer com a lista atual de streams
  _updateMixer() {
    if (this.mixer) {
      this.mixer.releaseStreams();
    }
    this.mixer = new MultiStreamsMixer(this.streams);
    this.mixer.frameInterval = 1;
    this.mixer.startDrawingFrames();
  }

  // Inicia a gravação do stream misturado
  startRecording() {
    if (!this.mixer) return;
    const mixedStream = this.mixer.getMixedStream();
    this.recorder = new MediaRecorder(mixedStream);
    this.recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };
    this.recorder.start();
  }

  // Para a gravação e cria um link para download do vídeo gravado
  stopRecording() {
    if (this.recorder) {
      this.recorder.stop();
      this.recorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'mixed-video.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      };
    }
  }
}