import '../assets/dialog.css';
import { boxItem } from '../types';

const SPEED_WRITING = 50;

export class Dialog {
  private text: string[];
  private txtBox: HTMLElement;

  constructor(text: string[]){
    this.text = text;
  }

  get isDisplayed(): boolean {
    console.log('the txt box',this.txtBox)
    return !!this.txtBox;
  }

  createBox(box: boxItem): void {
    if(!this.txtBox){
      this.txtBox = document.createElement('div');
      this.txtBox.className = 'text';
      this.txtBox.id = 'txtBox';
      this.txtBox.style.top = `${box.top}px`;
      this.txtBox.style.left = `${box.left}px`;
      this.txtBox.style.width = `${box.width}px`;
      this.txtBox.style.height = `${box.height}px`;
    }
    document.body.appendChild(this.txtBox);
  }

  writeText(): void {
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
            window.addEventListener('keydown', (e) => this.deleteDialog(e));
          }
        }, (SPEED_WRITING*(j+1))+(i*timeOffset*SPEED_WRITING))
      })
    });
  }

  private deleteDialog(event: KeyboardEvent): void{
    if(event.key === 'Enter'){
      if(this.txtBox) {
        this.txtBox.remove();
        this.txtBox = undefined;
      }
      window.removeEventListener('keydown', this.deleteDialog);
    } 
  }
}