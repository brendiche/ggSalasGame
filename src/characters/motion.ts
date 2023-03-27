import { Direction } from "../types";
import { Character } from "./character";

const directionDictionary: Record<string, Direction> = {
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowDown: 'down',
  ArrowUp: 'top'
}


export class Motion {
  private character: Character;
  private movingCommand: any ={
    ArrowRight:false,
    ArrowLeft:false,
    ArrowDown:false,
    ArrowUp: false,
    history: []
  }

  constructor(character: Character){
    this.character = character;
    this.init();
  }

  private init(): void {
    window.addEventListener('keydown',(e) => this.keyDownEvent(e));
    window.addEventListener('keyup', (e) => this.keyUpEvent(e));
  }

  private keyDownEvent(event: KeyboardEvent): void {
    switch(event.key){
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowUp':
        this.character.setDirection(directionDictionary[event.key]);
        this.movingCommand[event.key] = true;
        const idx = this.movingCommand.history.indexOf(event.key);
        if(idx !== -1 ) {
          this.movingCommand.history.splice(idx, 1);
        }
        this.movingCommand.history.push(event.key);
        this.character.startMoving();
        break;
    }
  }

  private keyUpEvent(event: KeyboardEvent): void {
    switch(event.key){
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'ArrowDown':
      case 'ArrowUp':
        this.movingCommand[event.key] = false;
        this.movingCommand.history.splice(this.movingCommand.history.indexOf(event.key), 1);
        if(
          !this.movingCommand.ArrowRight &&
          !this.movingCommand.ArrowLeft &&
          !this.movingCommand.ArrowDown &&
          !this.movingCommand.ArrowUp
        ) {
          this.character.stopMoving();
        } else {
          const newDirection = this.movingCommand.history[this.movingCommand.history.length - 1];
          this.character.setDirection(directionDictionary[newDirection]);
        }
      break;
    }
  }
}