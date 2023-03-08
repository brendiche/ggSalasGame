import '../assets/characters/character.css'

type Direction = 'top' | 'down' | 'right' | 'left' | 'stand'

export class Character {

  private name: string;
  private character: HTMLElement;
  private direction: Direction;

  constructor(name: string){
    this.name = name;
    this.character = document.createElement('div');
    this.character.className = `${name}-stand`;
    this.addEventListeners();
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
      console.log('[character][addListeners] keyup: ', event.key);
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
}