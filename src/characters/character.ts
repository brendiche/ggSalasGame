import '../assets/characters/character.css'
import { Engine } from '../core/engine';
import { getRandomColor, getValue, setValue } from '../helper';
import { boxItem, Direction } from '../types';
import { Motion } from './motion';


export class Character {

  private name: string;
  private character: HTMLElement;
  private direction: Direction;
  private collider: boxItem;
  private _debug = false;

  constructor(name: string, engine: Engine, top: number, left: number){
    this.name = name;
    this.character = document.createElement('div');
    this.character.className = `${name}-top`;
    // TODO 2023-03-13 this should be in an init function depending of the level
    this.character.style.top = `${top+244}px`;
    this.character.style.left = `${left}px`;
    this.collider = {
      height: 32,
      width: 42,
      top: top+244+28,
      left: left+10,
    }
    // ************
    engine.addGamingThread(() => {
      this.updateCollider();
    })
    new Motion(this);
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

  setDirection(dir: Direction): void{
    this.direction = dir;
    this.character.className = `${this.name}-${this.direction} ${this.isMoving ? ' moving' :''}`;
  }

  startMoving(){
    this.character.className += ' moving';
  }

  stopMoving(){
    this.character.className = this.character.className.split(' moving')[0];
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
}