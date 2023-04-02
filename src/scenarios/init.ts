import { Level, MapConfig } from '../level/level';
import { Screen } from '../core/screen';
import {
  charInitialRoomPoss,
  dialogBoxRoom,
  roomLevelMapConfig,
} from '../level/levelConfigs';
import { Engine } from '../core/engine';
import { Character } from '../characters/character';
import { GameManager } from '../core/gameManager';
import { Dialog } from '../core/dialog';
import { InteractionDialog } from '../interactions/interactionDialog';

const BLINK_CLASS = 'animate-image-blink';
export class InitScenario {
  private roomLevel: Level;
  private character: Character;
  private gameManager: GameManager;
  private engine: Engine;

  constructor(screen: Screen, engine: Engine) {
    // black screen + play sound
    this.engine = engine;
    this.roomLevel = new Level(roomLevelMapConfig, screen);
    this.character = new Character('ggsalas', engine);
    this.gameManager = new GameManager(engine, this.roomLevel, this.character);
  }

  init(): void {
    // display first level
    // update the trigger displaying level !
    setTimeout(() => {
      this.displayRoomLevel();
      // display blink char
      setTimeout(() => {
        const level = this.roomLevel.getLevel();
        level.className += level.className
          .split(' animate-image-blur')
          .join('');
        this.displayCharacter();
        // display first dialog
        setTimeout(() => {
          this.displayFristDialog();
        }, 1000);
      }, 2500);
    }, 2000);
  }

  private displayRoomLevel() {
    const level = this.roomLevel.getLevel();
    document.body.append(level);
    level.className += ' animate-image-blur';
    this.roomLevel.display();
  }

  private displayFristDialog() {
    const firstDialog = new Dialog([
      'ohhhh !!! que s’est-il passé ???',
      'je dois terminer GBD 3 !!!',
    ]);
    firstDialog.createBox(dialogBoxRoom(this.roomLevel.getOffset()));
    firstDialog.display();
    firstDialog.writeText();
    firstDialog.onHide(() => {
      this.gameManager.init();
      this.createFirstInteractionDialog();
    });
  }

  private displayCharacter() {
    this.character.addClass(BLINK_CLASS);
    this.character.display(
      charInitialRoomPoss(this.roomLevel.getOffset()).a, // rename this
      charInitialRoomPoss(this.roomLevel.getOffset()).b // renmae this
    );
    setTimeout(() => {
      this.character.removeClass(BLINK_CLASS);
    }, 500);
  }

  private createFirstInteractionDialog() {
    const firstInteractionDialog = new InteractionDialog({
      dialog: {
        text: ['panne d’inspi…', 'flemme…'],
        box: dialogBoxRoom(this.roomLevel.getOffset()),
      },
      interaction: {
        engin: this.engine,
        trigger: this.character.getCharacterCollider(),
        activationArea: {
          height: 34,
          width: 29,
          top: this.roomLevel.getOffset().top + 311,
          left: this.roomLevel.getOffset().left + 515,
        },
      },
    });
    firstInteractionDialog.onHide(() => {
      const level = this.roomLevel.getLevel();
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
    sensei.style.top = `${this.roomLevel.getOffset().top + 79}px`;
    sensei.style.left = `${this.roomLevel.getOffset().left + 255}px`;
    document.body.append(sensei);
    const senseiDialog = new Dialog([
      'Il va falloir te trouver de la motivation!',
      'Sort de chez toi... bouge-toi l’cul mec!',
    ]);
    senseiDialog.createBox(dialogBoxRoom(this.roomLevel.getOffset()));
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
    const level = this.roomLevel.getLevel();
    level.className += level.className.split(' animate-image-gray').join('');
  }
}
