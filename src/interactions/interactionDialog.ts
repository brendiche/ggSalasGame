import { Dialog } from "../core/dialog";
import { Engine } from "../core/engine";
import { boxItem } from "../types";
import { Interaction } from "./interaction";

export interface InteractionDialogParams{
  dialog:{
    text: string[];
    box: boxItem;
  };
  interaction: {
    engin: Engine;
    trigger: boxItem;
    activationArea: boxItem;
  }
}

export class InteractionDialog extends Interaction {
  private dialog: Dialog;
  private callbackRef: (e:KeyboardEvent)=>void;


  constructor(interactionDialogParams: InteractionDialogParams) {
    super(interactionDialogParams.interaction.engin,
      interactionDialogParams.interaction.trigger,
      interactionDialogParams.interaction.activationArea,
      () => this.enterCallbackDialog(),
      () => this.exitCallbackDialog());
    this.dialog = new Dialog(interactionDialogParams.dialog.text);
    this.dialog.createBox(interactionDialogParams.dialog.box);
  }

  onHide(callback: () => void): void{
    this.dialog.onHide(callback);
  }

  private enterCallbackDialog(): void{
    this.callbackRef = (e:KeyboardEvent) => this.interactionCallBack(e);
    window.addEventListener('keydown', this.callbackRef);
  }

  private exitCallbackDialog(): void{
    window.removeEventListener('keydown', this.callbackRef)
  }


  private interactionCallBack(event: KeyboardEvent){
    if(event.key === 'Enter' && !this.dialog.isDisplayed) {
      this.dialog.display();
      this.dialog.writeText();
    }
  }
}