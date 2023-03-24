import '../assets/characters/character.css'
import { Engine } from '../core/engine';
import { getRandomColor, getValue, setValue } from '../helper';
import { boxItem, Direction } from '../types';

const directionDictionary: Record<string, Direction> = {
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowDown: 'down',
  ArrowUp: 'top'
}
export class Character {

  private name: string;
  private character: HTMLElement;
  private direction: Direction;
  private collider: boxItem;
  private _debug = false;
  private  movingCommand = {
    ArrowRight: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
    ArrowDown: {
      pressed: false,
    },
    ArrowUp: {
      pressed: false,
    },
    lastPressed: ['ArrowRight'],
  }

  constructor(name: string, engine: Engine, top: number, left: number){
    this.name = name;
    this.character = document.createElement('div');
    this.character.className = `${name}-top`;
    // TODO 2023-03-13 this should be in an init function depending of the level
    this.character.style.top = `${top+244}px`;
    this.character.style.left = `${left}px`;
    // ************
    this.collider = {
      height: 32,
      width: 42,
      top: top+244+28,
      left: left+10,
    }
    this.addEventListeners();
    engine.addGamingThread(() => {
      this.updateCollider();
    })
    this.movingCommand.lastPressed = [];
  }

  getCharacter(): HTMLElement{
    return this.character;
  }

  getCharacterDirection(): Direction{
    return this.direction;
  }

  getCharacterCollider(): boxItem{
    return this.collider;
  }

  isMoving(): boolean {
    return this.character.className.includes('moving');
  }

  debug(){
    this._debug = true;
    let addToDom = false;
    const debugCollider = document.getElementById('collider') ?? document.createElement('div');
    if(!debugCollider.id){
      debugCollider.id = 'collider'
      debugCollider.style.backgroundColor = getRandomColor();
      debugCollider.style.opacity = '80%';
      debugCollider.style.position = 'absolute';
      setValue(debugCollider, this.collider.height, 'height');
      setValue(debugCollider, this.collider.width, 'width');
      addToDom = true;
    } 
    setValue(debugCollider, this.collider.top, 'top');
    setValue(debugCollider, this.collider.left, 'left');
    if(addToDom) document.body.appendChild(debugCollider);
  }

  private updateCollider(){
    this.collider.top = getValue(this.character, 'top')+28
    this.collider.left = getValue(this.character, 'left')+10
    if(this._debug)   this.debug()
  }

  private setDirection(dir: Direction): void{
    this.direction = dir;
    this.character.className = `${this.name}-${this.direction}`;
  }

  private stopMoving(){
    this.character.className = this.character.className.split(' moving')[0];
  }

  private startMoving(){
    this.character.className += ' moving';
  }

  private addEventListeners(): void{
    window.addEventListener('keydown', (event) => {
      switch(event.key){
        case 'ArrowRight':
          this.setDirection('right');
          this.movingCommand.ArrowRight.pressed = true;
          if(this.movingCommand.lastPressed.indexOf('ArrowRight') === -1 ) this.movingCommand.lastPressed.push('ArrowRight');
          this.startMoving();
          break;
        case 'ArrowLeft':
          this.setDirection('left');
          this.movingCommand.ArrowLeft.pressed = true;
          if(this.movingCommand.lastPressed.indexOf('ArrowLeft') === -1 ) this.movingCommand.lastPressed.push('ArrowLeft');
          this.startMoving();
          break;
        case 'ArrowDown':
          this.setDirection('down');
          this.movingCommand.ArrowDown.pressed = true;
          if(this.movingCommand.lastPressed.indexOf('ArrowDown') === -1 ) this.movingCommand.lastPressed.push('ArrowDown');
          this.startMoving();
          break;
        case 'ArrowUp':
          this.setDirection('top');
          this.movingCommand.ArrowUp.pressed = true;
          if(this.movingCommand.lastPressed.indexOf('ArrowUp') === -1 ) this.movingCommand.lastPressed.push('ArrowUp');
          this.startMoving();
          break;
      }
      console.log('Latest press direction : ', this.movingCommand.lastPressed);
    });
    window.addEventListener('keyup' , (event) => {
       switch(event.key){
          case 'ArrowRight':
            this.movingCommand.ArrowRight.pressed = false;
            this.movingCommand.lastPressed.splice(this.movingCommand.lastPressed.indexOf('ArrowRight'), 1)
            if(
              !(this.movingCommand.ArrowRight.pressed || 
              this.movingCommand.ArrowLeft.pressed ||
              this.movingCommand.ArrowDown.pressed ||
              this.movingCommand.ArrowUp.pressed) 
              ){
                this.stopMoving();
              }else{
                this.setDirection(directionDictionary[
                  this.movingCommand.lastPressed[this.movingCommand.lastPressed.length-1]
                ]);
              }
            break;
          case 'ArrowLeft':
            this.movingCommand.ArrowLeft.pressed = false;
            this.movingCommand.lastPressed.splice(this.movingCommand.lastPressed.indexOf('ArrowRight'), 1)
            if(
              !(this.movingCommand.ArrowRight.pressed || 
              this.movingCommand.ArrowLeft.pressed ||
              this.movingCommand.ArrowDown.pressed ||
              this.movingCommand.ArrowUp.pressed) 
              ){
                this.stopMoving();
              }else{
                this.setDirection(directionDictionary[
                  this.movingCommand.lastPressed[this.movingCommand.lastPressed.length-1]
                ]);
              }
            break;
          case 'ArrowDown':
            this.movingCommand.ArrowDown.pressed = false;
            this.movingCommand.lastPressed.splice(this.movingCommand.lastPressed.indexOf('ArrowRight'), 1)
            if(
              !(this.movingCommand.ArrowRight.pressed || 
              this.movingCommand.ArrowLeft.pressed ||
              this.movingCommand.ArrowDown.pressed ||
              this.movingCommand.ArrowUp.pressed) 
              ){
                this.stopMoving();
              }else{
                this.setDirection(directionDictionary[
                  this.movingCommand.lastPressed[this.movingCommand.lastPressed.length-1]
                ]);
              }
            break;
          case 'ArrowUp':
            this.movingCommand.ArrowUp.pressed = false;
            this.movingCommand.lastPressed.splice(this.movingCommand.lastPressed.indexOf('ArrowRight'), 1)
            if(
              !(this.movingCommand.ArrowRight.pressed || 
              this.movingCommand.ArrowLeft.pressed ||
              this.movingCommand.ArrowDown.pressed ||
              this.movingCommand.ArrowUp.pressed) 
              ){
                this.stopMoving();
              }else{
                this.setDirection(directionDictionary[
                  this.movingCommand.lastPressed[this.movingCommand.lastPressed.length-1]
                ]);
              }
            break;
       }
    });
  }
}