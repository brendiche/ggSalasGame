import { Character } from "../characters/character";
import { getValue, isOverlaping, setValue } from "../helper";
import { Level } from "../level/level";
import { Direction } from "../types";
import { Engine } from "./engine";
import { InteractionDialog } from "../interactions/interactionDialog";

const SPEED = 3;

export class GameManager {
  private character: Character;
  private preventCharFromMoving: boolean;
  private level: Level;
  private engine: Engine;
  private readonly debug: boolean;

  private firstInteractionDialog: InteractionDialog;

  constructor(engine: Engine, level: Level, character: Character){
    this.engine = engine;
    this.level = level;
    this.character = character;
    this.debug = !!new URLSearchParams(window.location.search).get('debug');
    this.firstInteractionDialog = new InteractionDialog({
      dialog:{
        text: ['panne d’inspi…', 'flemme…'],
        box: {
            height: 100,
            width: 569,
            top: this.level.getOffset().top+276,
            left: this.level.getOffset().left
        }
      },
      interaction:{
        engin: this.engine,
        trigger:  this.character.getCharacterCollider(),
        activationArea: {
          height:34, 
          width: 29,
          top: this.level.getOffset().top + 311,
          left: this.level.getOffset().left + 515,
        }
      }
    });
  }

  init(): void{
    document.body.appendChild(this.level.getLevel());
    document.body.appendChild(this.character.getCharacter());

    this.engine.addGamingThread(() => {
      this.characterMove(this.character.getCharacterDirection())
    });

    window.addEventListener('displayDialogEvent', () => this.preventCharFromMoving = true);
    window.addEventListener('hideDialogEvent', () => this.preventCharFromMoving = false);

    if(this.debug){
      this.level.debug();
      this.character.debug();
      this.firstInteractionDialog.debug();
    }
  }

  private characterAbleToMove(direction: Direction):boolean {
    if(!this.character.isMoving() || this.preventCharFromMoving) return false;
    const collider = this.character.getCharacterCollider();
    const offsetMap = this.level.getOffset();
    switch(direction){
      case 'down':
        collider.top += SPEED;
        break;
      case 'top':
        collider.top -= SPEED;
        break;
      case 'right':
          collider.left += SPEED;
          break; 
      case 'left':
        collider.left -= SPEED;
        break;
    }

    return !this.level.getItems().some((item) => {
      return isOverlaping(collider, {
        ...item,
        top: item.top + offsetMap.top,
        left: item.left + offsetMap.left,
      });
    });;
  }

  private characterMove(direction: Direction) {
    if(!this.characterAbleToMove(direction)) return;
    switch(direction){
      case 'right':
        setValue(this.character.getCharacter(), getValue(this.character.getCharacter(), 'left')+SPEED, 'left')
        break;
      case 'left':
        setValue(this.character.getCharacter(), getValue(this.character.getCharacter(), 'left')-SPEED, 'left')
        break;
      case 'down':
        setValue(this.character.getCharacter(), getValue(this.character.getCharacter(), 'top')+SPEED, 'top')
        break;
      case 'top':
        setValue(this.character.getCharacter(), getValue(this.character.getCharacter(), 'top')-SPEED, 'top')
        break;
    }
  }
}