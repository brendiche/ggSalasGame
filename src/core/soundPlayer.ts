export class SoundPlayer {
  private audio: HTMLAudioElement;
  constructor(
    file: string,
    options?: { loop?: boolean; volume?: number; speed?: number }
  ) {
    this.audio = new Audio(file);
    this.audio.controls = false;
    if (options?.loop) {
      this.audio.loop = options.loop;
    }
    if (options?.volume) {
      this.audio.volume = options.volume;
    }
    if (options?.speed) {
      this.audio.playbackRate = options.speed;
    }
    document.body.appendChild(this.audio);
  }

  play() {
    this.audio.play();
  }
}
