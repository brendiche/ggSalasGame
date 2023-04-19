import '../assets/sounds/coin-ding.wav';
import '../assets/sounds/ambiant.wav';
import '../assets/sounds/evil-laugh.wav';
import { Level, MapConfig } from '../level/level';
import { Screen } from '../core/screen';
import {
  charInitialRoomPoss,
  charInitialStudioPoss,
  dialogBoxRoom,
  roomLevelMapConfig,
  studioLevelMapConfig,
} from '../level/levelConfigs';
import { Engine } from '../core/engine';
import { Character } from '../characters/character';
import { GameManager } from '../core/gameManager';
import { Dialog } from '../core/dialog';
import { InteractionDialog } from '../interactions/interactionDialog';
import { Interaction } from '../interactions/interaction';
import { SoundPlayer } from '../core/soundPlayer';

const BLINK_CLASS = 'animate-image-blink';
const BLUR_CLASS = 'animate-image-blur';
const GRAY_CLASS = 'animate-image-gray';
const TO_BLACK_CLASS = 'animate-image-to-black';
const FROM_BLACK_CLASS = 'animate-image-from-black';
export class InitScenario {
  private roomLevel: Level;
  private studioLevel: Level;
  private character: Character;
  private gameManager: GameManager;
  private engine: Engine;

  constructor(screen: Screen, engine: Engine) {
    // black screen + play sound
    this.engine = engine;
    this.roomLevel = new Level(roomLevelMapConfig, screen);
    this.character = new Character('ggsalas', engine);
    this.gameManager = new GameManager(engine, this.roomLevel, this.character);
    this.studioLevel = new Level(studioLevelMapConfig, screen);
  }

  init(): void {
    // display landing page
    this.displayLandingPage();
    // display first level
    // update the trigger displaying level !
    // setTimeout(() => {
    // }, 2000);
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
    const sound = new SoundPlayer('../src/assets/sounds/coin-ding.wav', {
      volume: 0.1,
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
    const ambiant = new SoundPlayer('../src/assets/sounds/ambiant.wav', {
      loop: true,
      volume: 0.01,
    });
    ambiant.play();
  }

  private transitionToRoomLevel() {
    const laught = new SoundPlayer('../src/assets/sounds/evil-laugh.wav', {
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

  private displayRoomLevel() {
    this.roomLevel.addClass(BLUR_CLASS);
    this.roomLevel.display();
  }

  private displayFristDialog() {
    const firstDialog = new Dialog([
      'Hein ??? Que s’est-il passé ???',
      'Vite ! Je dois terminer Galbadia Vol.3',
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
      charInitialRoomPoss(this.roomLevel.getOffset()).colliderBox,
      charInitialRoomPoss(this.roomLevel.getOffset()).offset
    );
    setTimeout(() => {
      this.character.removeClass(BLINK_CLASS);
    }, 500);
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
      this.roomLevel.addClass(GRAY_CLASS);
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
    this.roomLevel.removeClass(GRAY_CLASS);
    const goToStudio = new Interaction(
      this.engine,
      this.character.getCharacterCollider(),
      {
        height: 10,
        width: 22,
        top: this.roomLevel.getOffset().top + 60,
        left: this.roomLevel.getOffset().left + 70,
      },
      () => {
        if (this.character.getCharacterDirection() === 'top') {
          this.character.destroy();
          this.roomLevel.addClass(TO_BLACK_CLASS);
          setTimeout(() => {
            this.gameManager.switchLevel(this.studioLevel);
            this.roomLevel.removeClass(TO_BLACK_CLASS);
            this.roomLevel.destroy();
            this.studioLevel.addClass(FROM_BLACK_CLASS);
            this.studioLevel.display();
            // display character
            this.character.display(
              charInitialStudioPoss(this.studioLevel.getOffset()).coliderBox, // rename this
              charInitialStudioPoss(this.studioLevel.getOffset()).offset // renmae this
            );
          }, 2000);
        }
      }
    );
  }
}
