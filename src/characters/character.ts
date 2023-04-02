import '../assets/characters/character.css';
import { Base } from '../core/base';
import { Engine } from '../core/engine';
import { getRandomColor, getValue, setValue } from '../helper';
import { boxItem, Direction } from '../types';
import { Motion } from './motion';

export class Character extends Base {
  private name: string;
  private direction: Direction;
  private collider: boxItem;
  private _debug = false;

  constructor(name: string, engine: Engine) {
    super();
    this.name = name;
    this.element = document.createElement('div');
    this.setDirection('top'); // maybe variablised
    this.element.style.display = 'none';
    engine.addGamingThread(() => {
      this.updateCollider();
    });
    new Motion(this);
    document.body.append(this.element);
  }

  getCharacter(): HTMLElement {
    return this.element;
  }

  getCharacterDirection(): Direction {
    return this.direction;
  }

  getCharacterCollider(): boxItem {
    return this.collider;
  }

  isMoving(): boolean {
    return this.element.className.includes('moving');
  }

  setDirection(dir: Direction): void {
    this.removeClass(`${this.name}-${this.direction}`);
    this.addClass(`${this.name}-${dir}`);
    this.direction = dir;
  }

  startMoving(): void {
    if (!this.isMoving()) this.addClass('moving');
  }

  stopMoving(): void {
    if (this.isMoving()) this.removeClass('moving');
  }

  display(
    charBox: boxItem,
    colliderOffset: { top: number; left: number }
  ): void {
    this.element.style.top = `${charBox.top}px`;
    this.element.style.left = `${charBox.left}px`;
    this.collider = {
      height: charBox.height,
      width: charBox.width,
      top: charBox.top + colliderOffset.top,
      left: charBox.left + colliderOffset.left,
    };
    this.element.style.display = 'block';
  }

  debug() {
    this._debug = true;
    let addToDom = false;
    const debugCollider =
      document.getElementById('collider') ?? document.createElement('div');
    if (!debugCollider.id) {
      debugCollider.id = 'collider';
      debugCollider.style.backgroundColor = getRandomColor();
      debugCollider.style.opacity = '80%';
      debugCollider.style.position = 'absolute';
      setValue(debugCollider, this.collider.height, 'height');
      setValue(debugCollider, this.collider.width, 'width');
      addToDom = true;
    }
    setValue(debugCollider, this.collider.top, 'top');
    setValue(debugCollider, this.collider.left, 'left');
    if (addToDom) document.body.appendChild(debugCollider);
  }

  private updateCollider() {
    if (this.collider) {
      this.collider.top = getValue(this.element, 'top') + 28;
      this.collider.left = getValue(this.element, 'left') + 10;
    }
    if (this._debug) this.debug();
  }
}
