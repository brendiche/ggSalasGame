import { boxItem } from "../types";
import { Engine } from "./engine";
import { getRandomColor, isOverlaping } from "../helper";

export class Interaction {
  private activationArea: boxItem;
  private enterCallback: () => void;
  private exitCallback?: () => void;
  private enterCallbackTriggered = false;

  constructor(
    engine: Engine,
    trigger: boxItem,
    activationArea: boxItem,
    enterCallback: () => void,
    exitCallback?: () => void) {
    this.activationArea = activationArea;
    this.enterCallback = enterCallback;
    if(exitCallback) this.exitCallback = exitCallback;

    engine.addGamingThread(() => {
      if (isOverlaping(trigger, activationArea)) {
        if(!this.enterCallbackTriggered){
          this.enterCallback();
          this.enterCallbackTriggered = true;
        }
      } else {
        if(this.exitCallback && this.enterCallbackTriggered) this.exitCallback();
        if(this.enterCallbackTriggered) this.enterCallbackTriggered = false;
      }
    })
  }

  debug(){
    const element = document.createElement('div');
    element.style.top = `${this.activationArea.top}px`;
    element.style.left = `${this.activationArea.left}px`;
    element.style.height = `${this.activationArea.height}px`;
    element.style.width = `${this.activationArea.width}px`;
    element.style.backgroundColor = getRandomColor();
    element.style.position = 'absolute';
    element.style.opacity = '70%';
    document.body.appendChild(element)
  }
}