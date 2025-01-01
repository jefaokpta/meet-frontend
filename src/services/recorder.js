
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

    this.recorder.onstop = (event) => {
      console.log("Recording stopped", this.chunks);
      this._download();
    }

    this.recorder.ondataavailable = (event) => {
      if (!event.data.size || !event.data) return
      this.chunks.push(event.data);
    }

    this.recorder.start();
    console.log("Recording iniciado", this.recorder);
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
    this.recorder.stop();
  }

  _download() {
    console.log('Download iniciado', this.chunks);
    const blob = new Blob(this.chunks, { type: this.videoType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = "video.webm";
    document.body.appendChild(a);
    a.click();
  }

}