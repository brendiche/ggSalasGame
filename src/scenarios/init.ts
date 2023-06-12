import '../assets/sounds/start_game.mp3';
import '../assets/sounds/music_normal.mp3';
import '../assets/sounds/rire_malefique.wav';
import { Level, MapConfig } from '../level/level';
import { Screen } from '../core/screen';
import {
  actionBoxRoom,
  charInitialRoomPoss,
  charInitialStudioPoss,
  dialogBoxRoom,
  roomLevelMapConfig,
  studioLevelMapConfig,
} from '../level/levelConfigs';
import { Engine } from '../core/engine';
import { Character } from '../characters/character';
import { GameManager } from '../core/gameManager';
import { Dialog } from '../dialogs/dialog';
import { InteractionDialog } from '../interactions/interactionDialog';
import { Interaction } from '../interactions/interaction';
import { SoundPlayer } from '../core/soundPlayer';
import { GgSalasDialog } from '../dialogs/ggSalasDialog';
import { ActionBox } from '../dialogs/actionBox';

const BLINK_CLASS = 'animate-image-blink';
const BLUR_CLASS = 'animate-image-blur';
const GRAY_CLASS = 'animate-image-gray';
const TO_BLACK_CLASS = 'animate-image-to-black';
const FROM_BLACK_CLASS = 'animate-image-from-black';
export class InitScenario {
  private roomLevel: Level;
  private studioLevel: Level;
  private ggsalas: Character;
  private sensei: Character;
  private gameManager: GameManager;
  private engine: Engine;

  constructor(screen: Screen, engine: Engine) {
    // black screen + play sound
    this.engine = engine;
    this.roomLevel = new Level(roomLevelMapConfig, screen);
    this.ggsalas = new Character('ggsalas', engine);
    this.ggsalas.addMotion();
    this.sensei = new Character('sensei', engine, 'down');
    this.gameManager = new GameManager(engine, this.roomLevel, this.ggsalas);
    this.studioLevel = new Level(studioLevelMapConfig, screen);
  }

  init(): void {
    this.displayLandingPage();
  }

  private displayLandingPage() {
    const landing = document.createElement('div');
    landing.className = 'landing';
    const txt = document.createElement('p');
    txt.className = 'txt';
    txt.innerText = 'Appuyez sur enter';
    txt.style.top = '50px';
    const txt2 = document.createElement('p');
    txt2.className = 'txt';
    txt2.innerText = "pour commencer l'aventure";
    txt2.style.top = '75px';
    landing.appendChild(txt);
    landing.appendChild(txt2);
    document.body.append(landing);
    const sound = new SoundPlayer('../src/assets/sounds/start_game.mp3', {
      speed: 1.6,
    });
    const pressEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        sound.play();
        window.removeEventListener('keydown', pressEnter);
        landing.className += ` ${TO_BLACK_CLASS}`;
        setTimeout(() => {
          landing.remove();
          this.transitionToRoomLevel();
        }, 2000);
      }
    };
    window.addEventListener('keydown', pressEnter);
  }

  private playAmbiantSound() {
    const ambiant = new SoundPlayer('../src/assets/sounds/music_normal.mp3', {
      loop: true,
      volume: 0.3,
    });
    ambiant.play();
  }

  private transitionToRoomLevel() {
    const laught = new SoundPlayer('../src/assets/sounds/rire_malefique.wav', {
      volume: 1,
    });
    const laughtDialog = new Dialog(['* rire maléfique *']);
    laughtDialog.createBox(dialogBoxRoom(this.roomLevel.getOffset()));
    laughtDialog.display();
    laught.play();
    laughtDialog.writeText();
    setTimeout(() => {
      laughtDialog.hide();
      this.playAmbiantSound();
      this.displayRoomLevel();
      // display blink char
      setTimeout(() => {
        this.roomLevel.removeClass(BLUR_CLASS);
        this.displayCharacter();
        // display first dialog
        setTimeout(() => {
          this.displayFristDialog();
        }, 1000);
      }, 2500);
    }, 3000);
  }

  private displayCharacter() {
    this.ggsalas.addClass(BLINK_CLASS);
    this.ggsalas.display(
      charInitialRoomPoss(this.roomLevel.getOffset()).colliderBox,
      charInitialRoomPoss(this.roomLevel.getOffset()).offset
    );
    setTimeout(() => {
      this.ggsalas.removeClass(BLINK_CLASS);
    }, 500);
  }

  private displayRoomLevel() {
    this.roomLevel.addClass(BLUR_CLASS);
    this.roomLevel.display();
  }

  private displayFristDialog() {
    const firstDialog = new GgSalasDialog([
      'Hein ??? Que s’est-il passé ???',
      'Vite ! Je dois terminer Galbadia Vol.3',
    ]);
    firstDialog.createBox(dialogBoxRoom(this.roomLevel.getOffset()));
    firstDialog.display();
    firstDialog.writeText();
    firstDialog.onHide(() => {
      this.gameManager.init();
      const action = new ActionBox('Aller devant le PC');
      action.createBox(actionBoxRoom(this.roomLevel.getOffset()));
      action.writeText();
      action.display(3000);
      this.createFirstInteractionDialog();
    });
  }

  private createFirstInteractionDialog() {
    const firstInteractionDialog = new InteractionDialog({
      dialog: {
        text: [
          '…',
          '…',
          'Erf… Encore une panne d’inspi, je n’y arriverai jamais…',
        ],
        box: dialogBoxRoom(this.roomLevel.getOffset()),
      },
      interaction: {
        engin: this.engine,
        trigger: this.ggsalas.getCharacterCollider(),
        activationArea: {
          height: 34,
          width: 29,
          top: this.roomLevel.getOffset().top + 311,
          left: this.roomLevel.getOffset().left + 515,
        },
      },
    });
    firstInteractionDialog.onHide(() => {
      this.roomLevel.addClass(GRAY_CLASS);
      // display sensei
      setTimeout(() => {
        this.displaySensei();
      }, 2000);
    });
  }

  private displaySensei() {
    this.sensei.addClass(BLUR_CLASS);
    this.sensei.display(
      {
        top: this.roomLevel.getOffset().top + 79,
        left: this.roomLevel.getOffset().left + 255,
        height: 42,
        width: 32,
      },
      {
        top: 28,
        left: 10,
      }
    );
    setTimeout(() => {
      this.sensei.removeClass(BLINK_CLASS);
    }, 500);
    const senseiDialog = new Dialog([
      'Il va falloir te trouver de la motivation!',
      'Sort de chez toi... bouge-toi l’cul mec!',
    ]);
    senseiDialog.createBox(dialogBoxRoom(this.roomLevel.getOffset()));
    senseiDialog.onHide(() => {
      this.sensei.destroy();
      this.changeMap();
    });
    setTimeout(() => {
      senseiDialog.display();
      senseiDialog.writeText();
    }, 2500);
  }

  private changeMap() {
    this.roomLevel.removeClass(GRAY_CLASS);
    const goToStudio = new Interaction(
      this.engine,
      this.ggsalas.getCharacterCollider(),
      {
        height: 10,
        width: 22,
        top: this.roomLevel.getOffset().top + 60,
        left: this.roomLevel.getOffset().left + 70,
      },
      () => {
        if (this.ggsalas.getCharacterDirection() === 'top') {
          this.ggsalas.destroy();
          this.roomLevel.addClass(TO_BLACK_CLASS);
          setTimeout(() => {
            this.gameManager.switchLevel(this.studioLevel);
            this.roomLevel.removeClass(TO_BLACK_CLASS);
            this.roomLevel.destroy();
            this.studioLevel.addClass(FROM_BLACK_CLASS);
            this.studioLevel.display();
            // display character
            this.ggsalas.display(
              charInitialStudioPoss(this.studioLevel.getOffset()).coliderBox, // rename this
              charInitialStudioPoss(this.studioLevel.getOffset()).offset // renmae this
            );
          }, 2000);
        }
      }
    );
  }
}
