import './assets/dialog.css';
import { boxItem } from './types';

const SPEED_WRITING = 50;

export class Dialog {
  private text: string[];
  private txtBox: HTMLElement;

  constructor(box: boxItem, text: string[]){
    this.text = text;
    this.txtBox = document.createElement('div');
    this.txtBox.className = 'text';
    this.txtBox.id = 'txtBox';
    this.txtBox.style.top = `${box.top}px`
    this.txtBox.style.left = `${box.left}px`
    this.txtBox.style.width = `${box.width}px`
    this.txtBox.style.height = `${box.height}px`
  }

  createBox(): HTMLElement{
    return this.txtBox;
  }

  writeText(): void{
    const line = document.createElement('div');
    line.className = 'line-1 anim-typewriter';
    this.txtBox.appendChild(line);
    let timeOffset = 0;
    this.text.forEach((txt,i) => {
      const writingText = document.createTextNode('');
      if(i > 0) {
        line.appendChild(document.createElement('br'));
        timeOffset += this.text[i-1].split('').length;
      }
      line.appendChild(writingText);
      txt.split('').forEach((char,j) => {
        setTimeout(() => {
          writingText.appendData(char);
          if(i === this.text.length - 1 && j === txt.split('').length -1) {
            window.addEventListener('keydown', this.deleteDialog)
          }
        }, (SPEED_WRITING*(j+1))+(i*timeOffset*SPEED_WRITING))
      })
    });
  }

  private deleteDialog(event: KeyboardEvent): void{
    if(event.key === 'Enter'){
      this.txtBox.remove();
      window.removeEventListener('keydown', this.deleteDialog);
    } 
  }
}