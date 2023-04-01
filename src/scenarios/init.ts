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
import { InteractionDialog } from '../interactions/interactionDialog';

const firstLevelConfig: MapConfig = {
  className: 'room',
  box: firstLevelConfigParms,
  items: itemsConfigParams,
};

export class InitScenario {
  private firstLevel: Level;
  private character: Character;
  private gameManager: GameManager;
  private engine: Engine;

  constructor(screen: Screen, engine: Engine) {
    // black screen + play sound
    this.engine = engine;
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
        const level = this.firstLevel.getLevel();
        level.className += level.className.split(' animate-image-blur').join('');
        this.displayCharacter();
        // display first dialog
        setTimeout(() => {
          this.displayFristDialog();
        }, 1000);
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
      this.createFirstInteractionDialog();
    });
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

  private createFirstInteractionDialog() {
    const firstInteractionDialog = new InteractionDialog({
      dialog: {
        text: ['panne d’inspi…', 'flemme…'],
        box: {
          height: 100,
          width: 569,
          top: this.firstLevel.getOffset().top + 276,
          left: this.firstLevel.getOffset().left,
        },
      },
      interaction: {
        engin: this.engine,
        trigger: this.character.getCharacterCollider(),
        activationArea: {
          height: 34,
          width: 29,
          top: this.firstLevel.getOffset().top + 311,
          left: this.firstLevel.getOffset().left + 515,
        },
      },
    });
    firstInteractionDialog.onHide(() => {
      const level = this.firstLevel.getLevel();
      level.className += ' animate-image-gray';
      // display sensei
      setTimeout(() => {
        this.displaySensei();
      }, 2000);
    });
  }

  // TODO : PUT PNJ IN CLASS
  private displaySensei() {
    const sensei = document.createElement('div');
    sensei.id = 'sensei';
    sensei.className = 'sensei animate-image-blur';
    sensei.style.top = `${this.firstLevel.getOffset().top + 79}px`;
    sensei.style.left = `${this.firstLevel.getOffset().left + 255}px`;
    document.body.append(sensei);
    const senseiDialog = new Dialog([
      'Il va falloir te trouver de la motivation!',
      'Sort de chez toi... bouge-toi l’cul mec!',
    ]);
    senseiDialog.createBox({
      height: 100,
      width: 569,
      top: this.firstLevel.getOffset().top + 276,
      left: this.firstLevel.getOffset().left,
    });
    senseiDialog.onHide(() => {
      sensei.remove();
      this.changeMap();
    });
    setTimeout(() => {
      senseiDialog.display();
      senseiDialog.writeText();
    }, 2500);
  }

  private changeMap() {
    console.log('change map');
    const level = this.firstLevel.getLevel();
    level.className += level.className.split(' animate-image-gray').join('');
  }
}
