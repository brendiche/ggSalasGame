import '../assets/characters/character.css'
import { Engine } from '../core/engine';

type Direction = 'top' | 'down' | 'right' | 'left' | 'stand'
const SPEED = 3;
export class Character {

  private name: string;
  private character: HTMLElement;
  private direction: Direction;

  constructor(name: string, engine: Engine, top: number, left: number){
    this.name = name;
    this.character = document.createElement('div');
    this.character.className = `${name}-stand`;
    this.character.style.top = `${top+244}px`;
    this.character.style.left = `${left}px`;
    this.addEventListeners();
    engine.addGamingThread(() => {
      this.move(this.direction);
    })
  }

  getCharacter(): HTMLElement{
    return this.character;
  }

  private setDirection(dir: Direction): void{
    this.direction = dir;
    this.character.className = `${this.name}-${this.direction}`;
  }

  private addEventListeners(): void{
    window.addEventListener('keydown', (event) => {
      switch(event.key){
        case 'ArrowRight':
          this.setDirection('right');
          break;
        case 'ArrowLeft':
          this.setDirection('left');
          break;
        case 'ArrowDown':
          this.setDirection('down');
          break;
        case 'ArrowUp':
          this.setDirection('top');
          break;
      }
    });
    window.addEventListener('keyup' , (event) => {
      // console.log('[character][addListeners] keyup: ', event.key);
       switch(event.key){
          case 'ArrowRight':
          case 'ArrowLeft':
          case 'ArrowDown':
          case 'ArrowUp':
            this.setDirection('stand');
          break;
       }
    });
  }

  private move(direction: Direction){
    switch(direction){
      case 'right':
        this.setDirection('right');
        this.character.style.left = `${parseInt(this.character.style.left.split('px')[0])+SPEED}px`; 
        break;
      case 'left':
        this.setDirection('left');
        this.character.style.left = `${parseInt(this.character.style.left.split('px')[0])-SPEED}px`; 
        break;
      case 'down':
        this.setDirection('down');
        this.character.style.top = `${parseInt(this.character.style.top.split('px')[0])+SPEED}px`; 
        break;
      case 'top':
        this.setDirection('top');
        this.character.style.top = `${parseInt(this.character.style.top.split('px')[0])-SPEED}px`; 
        break;
    }
  }
}