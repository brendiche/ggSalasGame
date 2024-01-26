import { boxItem } from '../types';

export class ActionBox {
  private text: string;
  private line: HTMLElement;
  private txtBox: HTMLElement;

  constructor(text: string) {
    this.text = text;
  }

  display(timmer?: number) {
    this.txtBox.style.display = 'block';
    if (timmer) {
      setTimeout(() => {
        this.hide();
      }, timmer);
    }
  }

  hide() {
    this.txtBox.style.display = 'none';
  }

  createBox(box: boxItem): void {
    if (!this.txtBox) {
      this.txtBox = document.createElement('div');
      this.txtBox.className = 'text-action';
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
    this.line.className = 'line-1';
    this.line.append(document.createTextNode(this.text));
    this.txtBox.appendChild(this.line);
  }
}
