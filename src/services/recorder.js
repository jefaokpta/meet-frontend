
export class Recorder {
  constructor(stream) {
    this.recorder = null;
    this.stream = stream
    this.chunks = [];
    this.videoType = "video/webm";
  }

  async startRecording() {
    const options = this._setup();
    if (!this.stream.active) return;
    this.recorder = new MediaRecorder(this.stream, options);
    console.log('Recording preparado', this.recorder, 'options', options);

    this.recorder.onstop = (event) => {
      console.log("Recording stopped", this.chunks);
    }

    this.recorder.ondataavailable = (event) => {
      if (!event.data.size || !event.data) return
      this.chunks.push(event.data);
    }

    this.recorder.start();
    console.log("Recording iniciado");
  }

  _setup() {
    const codecs = [
      "codecs=vp9,opus",
      "codecs=vp8,opus",
      "",
    ];
    const options = codecs
      .map((codec) => ({ mimeType: `${this.videoType};${codec}`}))
      .find((options) => MediaRecorder.isTypeSupported(options.mimeType));
    if (!options) throw new Error("Nenhum supported codecs found");
    return options;
  }

  stopRecording() {
    if (!this.recorder) return;
    console.log('parando gravacao status: ', this.recorder.state);
    this.recorder.stop();
  }

}