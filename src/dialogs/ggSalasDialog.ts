import '../assets/sounds/ggsalas_txt.mp3';
import { SoundPlayer } from '../core/soundPlayer';
import { CharacterDialog } from './characterDialog';

const CLASS_GGSALAS = 'ggsalas-dresseur';

export class GgSalasDialog extends CharacterDialog {
  constructor(text: string[]) {
    super(
      text,
      CLASS_GGSALAS,
      new SoundPlayer('./src/assets/sounds/ggsalas_txt.mp3', {
        loop: true,
        volume: 0.1,
      })
    );
  }
}
