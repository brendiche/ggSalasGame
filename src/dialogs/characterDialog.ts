import { SoundPlayer } from '../core/soundPlayer';
import { boxItem } from '../types';
import { Dialog } from './dialog';

export class CharacterDialog extends Dialog {
  private image: string;
  private sound: SoundPlayer;

  constructor(text: string[], image: string, sound?: SoundPlayer) {
    super(text);
    this.image = image;
    this.sound = sound;
  }

  display() {
    this.txtBox.style.display = 'grid';
    window.dispatchEvent(this.displayDialogEvent);
  }

  createBox(box: boxItem): void {
    super.createBox(box);
    this.txtBox.className = 'text align-left avatar-dialog';
    const avatar = document.createElement('div');
    avatar.className = this.image;
    this.txtBox.appendChild(avatar);
  }

  writeText() {
    if (this.sound) {
      console.log('playsound');
      this.sound.play();
      window.addEventListener('endWritingEvent', () => this.sound.stop());
    }
    super.writeText();
  }
}
