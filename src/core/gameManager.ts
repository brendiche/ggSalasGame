import { Character } from "../characters/character";
import { getValue, isOverlaping, setValue } from "../helper";
import { Level } from "../level/level";
import { Direction } from "../types";
import { Engine } from "./engine";

const SPEED = 3;

export class GameManager {
  character: Character;
  level: Level;
  engine: Engine;
  private readonly debug: boolean;

  constructor(engine: Engine, level: Level, character: Character){
    this.engine = engine;
    this.level = level;
    this.character = character;
    this.debug = !!new URLSearchParams(window.location.search).get('debug');

    this.engine.addGamingThread(() => {
      this.characterMove(this.character.getCharacterDirection())
    })
  }

  init(): void{
    document.body.appendChild(this.level.getLevel());
    document.body.appendChild(this.character.getCharacter());

    if(this.debug){
      this.level.debug();
      this.character.debug();
    }
  }

  private characterAbleToMove(direction: Direction):boolean {
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