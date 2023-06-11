import { boxItem } from '../types';
import '../assets/quizz/quizz.css';

type quizzStep = {
  question: string;
  candidate: string[];
  answer: number;
};
const SPEED_WRITING = 50;
export class Quizz {
  private config: quizzStep[];
  private boxItem: boxItem;
  private txtBox: HTMLElement;
  private cursor: HTMLElement;
  private currentStep: quizzStep;
  private currentStepIndex: number;

  constructor(config: quizzStep[], boxItem: boxItem) {
    this.config = config;
    this.boxItem = boxItem;
  }

  async start() {
    this.currentStepIndex = 0;
    this.createBox();
    this.nextQuestion(this.currentStepIndex);
    // loop until no more questions
    // display result
    // callback with result
  }

  private async nextQuestion(index: number) {
    this.currentStep = this.config[index];

    // TODO 2023-06-11 : implement the win
    if (!this.currentStep) {
      console.log('finish');
      return;
    }
    // display first question
    await this.writeText(
      this.currentStep.question,
      'quizz-line-1 quizz-question'
    );

    // display candidats
    for await (const candidate of this.currentStep.candidate) {
      await this.writeText(candidate, 'quizz-line-1 quizz-answer');
    }
    // display selector
    this.createCursor();
  }

  private createBox(): void {
    if (!this.txtBox) {
      this.txtBox = document.createElement('div');
      this.txtBox.className = 'quizz-text';
      this.txtBox.id = 'quizz-txtBox';
      this.txtBox.style.top = `${this.boxItem.top}px`;
      this.txtBox.style.left = `${this.boxItem.left}px`;
      this.txtBox.style.width = `${this.boxItem.width}px`;
      this.txtBox.style.height = `${this.boxItem.height}px`;
    }
    document.body.appendChild(this.txtBox);
  }

  private async writeText(lineTxt: string, className: string): Promise<void> {
    return new Promise((resolve) => {
      const line = document.createElement('div');
      line.className = `${className} anim-typewriter`;
      this.txtBox.appendChild(line);
      const writingText = document.createTextNode('');
      line.append(writingText);
      lineTxt.split('').forEach((char, i) => {
        setTimeout(() => {
          writingText.appendData(char);
          if (i === lineTxt.split('').length - 1) {
            resolve();
          }
        }, SPEED_WRITING * i);
      });
    });
  }

  private removeText() {
    while (this.txtBox.firstChild) {
      this.txtBox.removeChild(this.txtBox.firstChild);
    }
  }

  private createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.id = 'cursor';
    this.cursor.className = 'quizz-cursor';
    this.cursor.style.gridColumn = '1';
    this.cursor.style.gridRow = '2';
    this.txtBox.appendChild(this.cursor);
    const keydownCallback = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          if (parseInt(this.cursor.style.gridRow) !== 4) {
            this.cursor.style.gridRow = `${
              parseInt(this.cursor.style.gridRow) + 1
            }`;
          }
          break;
        case 'ArrowUp':
          if (parseInt(this.cursor.style.gridRow) !== 2) {
            this.cursor.style.gridRow = `${
              parseInt(this.cursor.style.gridRow) - 1
            }`;
          }
          break;
        case 'Enter':
          const indexValue = parseInt(this.cursor.style.gridRow) - 2;
          this.selectValue(indexValue);
          // remove event listener
          window.removeEventListener('keydown', keydownCallback);
          break;
      }
    };
    window.addEventListener('keydown', keydownCallback);
  }

  private selectValue(index: number) {
    if (this.currentStep.answer === index) {
      this.removeText();
      // next question
      this.currentStepIndex += 1;
      this.nextQuestion(this.currentStepIndex);
    } else {
      // game over screen
    }
  }
}
