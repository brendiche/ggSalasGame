type CallbackGameEngine = () => void
const FRAME_RATE = 20;
export class Engine {
  private readonly runnigThread: CallbackGameEngine[];

  constructor(frameRate = FRAME_RATE){
    this.runnigThread = [];
    setInterval(() => {
      for (const callback of this.runnigThread) {
        callback();
      }
    }, frameRate)
  }

  public addGamingThread(callback: CallbackGameEngine): void {
    this.runnigThread.push(callback);
  }
}