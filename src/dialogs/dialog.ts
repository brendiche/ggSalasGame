import '../assets/dialog.css';
import { boxItem } from '../types';

const SPEED_WRITING = 50;
export class Dialog {
  private text: string[];
  private line: HTMLElement;
  protected txtBox: HTMLElement;
  
  private hideDialogEvent: Event;
  private endWritingEvent: Event;
  protected displayDialogEvent: Event;

  constructor(text: string[]) {
    this.text = text;
    this.displayDialogEvent = new Event('displayDialogEvent'); // TODO 2023-03-29 : export const from those 2
    this.hideDialogEvent = new Event('hideDialogEvent');
    this.endWritingEvent = new Event('endWritingEvent');
  }

  get isDisplayed(): boolean {
    return this.txtBox.style.display !== 'none';
  }

  display() {
    this.txtBox.style.display = 'block';
    window.dispatchEvent(this.displayDialogEvent);
  }

  hide() {
    this.txtBox.style.display = 'none';
    window.dispatchEvent(this.hideDialogEvent);
  }

  onHide(callback: () => void): void {
    const cb = () => {
      callback();
      window.removeEventListener('hideDialogEvent', cb);
    };
    window.addEventListener('hideDialogEvent', cb);
  }

  createBox(box: boxItem): void {
    if (!this.txtBox) {
      this.txtBox = document.createElement('div');
      this.txtBox.className = 'text';
      this.txtBox.id = 'txtBox';
      this.txtBox.style.display = 'none';
      this.txtBox.style.top = `${box.top}px`;
      this.txtBox.style.left = `${box.left}px`;
      this.txtBox.style.width = `${box.width}px`;
      this.txtBox.style.height = `${box.height}px`;
    }
    document.body.appendChild(this.txtBox);
  }

  writeText(): void {
    this.line = document.createElement('div');
    this.line.className = 'line-1 anim-typewriter';
    this.txtBox.appendChild(this.line);
    let timeOffset = 0;
    this.text.forEach((txt, i) => {
      const writingText = document.createTextNode('');
      if (i > 0) {
        this.line.appendChild(document.createElement('br'));
        timeOffset += this.text[i - 1].split('').length;
      }
      this.line.appendChild(writingText);
      txt.split('').forEach((char, j) => {
        setTimeout(() => {
          writingText.appendData(char);
          if (i === this.text.length - 1 && j === txt.split('').length - 1) {
            window.addEventListener('keydown', (e) => this.deleteDialog(e));
            window.dispatchEvent(this.endWritingEvent);
          }
        }, SPEED_WRITING * (j + 1) + i * timeOffset * SPEED_WRITING);
      });
    });
  }

  private deleteDialog(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.txtBox.style.display !== 'none') {
        this.hide();
        this.txtBox.removeChild(this.line);
      }
      window.removeEventListener('keydown', this.deleteDialog);
    }
  }
}
