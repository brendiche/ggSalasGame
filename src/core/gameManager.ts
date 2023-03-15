import { Character } from "../characters/character";
import { getValue, isOverlaping, setValue } from "../helper";
import { Level } from "../level/level";
import { Direction } from "../types";
import { Dialog } from "./dialog";
import { Engine } from "./engine";
import { Interaction } from "./interaction";

const SPEED = 3;

export class GameManager {
  private character: Character;
  private level: Level;
  private engine: Engine;
  private readonly debug: boolean;

  private firstInteraction: Interaction;
  private firstDialog: Dialog; 

  constructor(engine: Engine, level: Level, character: Character){
    this.engine = engine;
    this.level = level;
    this.character = character;
    this.debug = !!new URLSearchParams(window.location.search).get('debug');
    this.firstDialog = this.createFirstDialog();
    this.firstInteraction = this.createFirstInteraction();
  }

  init(): void{
    document.body.appendChild(this.level.getLevel());
    document.body.appendChild(this.character.getCharacter());

    this.engine.addGamingThread(() => {
      this.characterMove(this.character.getCharacterDirection())
    });

    if(this.debug){
      this.level.debug();
      this.character.debug();
      this.firstInteraction.debug();
    }
  }

  private characterAbleToMove(direction: Direction):boolean {
    if(!this.character.isMoving()) return false;
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

  private createFirstInteraction(): Interaction {
    const interaction = new Interaction(this.engine, this.character.getCharacterCollider(), {
        height:34, 
        width: 29,
        top: this.level.getOffset().top + 311,
        left: this.level.getOffset().left + 515,
    }, () => {
      window.addEventListener('keydown', (e) => this.interactionCallBack(e))
    }, () => {
      window.removeEventListener('keydown', (e) => this.interactionCallBack(e))
    });
    return interaction;
  }

  private interactionCallBack(event: KeyboardEvent){
    if(event.key === 'Enter') {
      document.body.appendChild(this.firstDialog.createBox());
      this.firstDialog.writeText();
    }
  }

  private createFirstDialog(){
    const dialog = new Dialog({
      height: 100,
      width: 569,
      top: this.level.getOffset().top+276,
      left: this.level.getOffset().left
    },
    ['panne d’inspi…', 'flemme…']);
    return dialog;
  }
}