import '../assets/sounds/sensei_txt.mp3';
import { SoundPlayer } from '../core/soundPlayer';
import { CharacterDialog } from './characterDialog';

const CLASS_SENSEI = 'buzz-dialog';

export class SenseiDialog extends CharacterDialog {
  constructor(text: string[]) {
    super(
      text,
      CLASS_SENSEI,
      new SoundPlayer('./src/assets/sounds/sensei_txt.mp3', {
        loop: true,
        volume: 0.1,
      })
    );
  }
}
