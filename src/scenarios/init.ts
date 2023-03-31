import { Level, MapConfig } from '../level/level';
import { Screen } from '../core/screen';
import {
  firstLevelConfigParms,
  itemsConfigParams,
} from '../level/levelConfigs';
import { Engine } from '../core/engine';
import { Character } from '../characters/character';
import { GameManager } from '../core/gameManager';
import { Dialog } from '../core/dialog';

const firstLevelConfig: MapConfig = {
  className: 'room',
  box: firstLevelConfigParms,
  items: itemsConfigParams,
};

export class InitScenario {
  private firstLevel: Level;
  private character: Character;
  private gameManager: GameManager;

  constructor(screen: Screen, engine: Engine) {
    // black screen + play sound
    this.firstLevel = new Level(firstLevelConfig, screen);
    this.character = new Character(
      'ggsalas',
      engine,
      this.firstLevel.getOffset().top,
      this.firstLevel.getOffset().left
    );
    this.gameManager = new GameManager(engine, this.firstLevel, this.character);

    // display first level
    // update the trigger displaying level !
    setTimeout(() => {
      this.displayLevel();
      // display blink char
      setTimeout(() => {
        this.displayCharacter();
        // display first dialog
        setTimeout(() => {
          this.displayFristDialog();
        }, 2500);
      }, 2500);
    }, 2000);
  }

  private displayLevel() {
    const level = this.firstLevel.getLevel();
    document.body.append(level);
    level.className += ' animate-image-blur';
    this.firstLevel.display();
  }

  private displayFristDialog() {
    const firstDialog = new Dialog([
      'ohhhh !!! que s’est-il passé ???',
      'je dois terminer GBD 3 !!!',
    ]);
    firstDialog.createBox({
      height: 100,
      width: 569,
      top: this.firstLevel.getOffset().top + 276,
      left: this.firstLevel.getOffset().left,
    });
    firstDialog.display();
    firstDialog.writeText();
    firstDialog.onHide(() => {
      this.gameManager.init();
    })
  }

  private displayCharacter() {
    const char = this.character.getCharacter();
    document.body.append(char);
    char.className += ' animate-image-blink';
    setTimeout(() => {
      char.className = char.className.split(' animate-image-blink').join('');
    }, 500);
    this.character.display(
      {
        height: 32,
        width: 42,
        top: this.firstLevel.getOffset().top + 244,
        left: this.firstLevel.getOffset().left,
      },
      {
        top: 28,
        left: 10,
      }
    );
  }
}
