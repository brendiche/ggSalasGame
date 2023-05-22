import '../assets/sounds/buzz_txt.mp3';
import { SoundPlayer } from '../core/soundPlayer';
import { CharacterDialog } from './characterDialog';

const CLASS_BUZZ = 'buzz-dialog';

export class BuzzDialog extends CharacterDialog {
  constructor(text: string[]) {
    super(
      text,
      CLASS_BUZZ,
      new SoundPlayer('./src/assets/sounds/buzz_txt.mp3', {
        loop: true,
        volume: 0.1,
      })
    );
  }
}
