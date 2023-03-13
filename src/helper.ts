import { boxItem } from "./types";

export const getRandomColor = (): string => {
  let color: number[] = [];
  for(let i = 0; i < 6; i++){
    color.push(Math.trunc(Math.random()*10))
  }
  return `#${color.join('')}`;
}

export const getAfineTransform = (a:number,b:number) => (x:number) => (a*x+b);

export const getValue = (element: HTMLElement, attr: 'left'|'top'|'backgroundPositionX'|'backgroundPositionY'|'width'|'height' = 'left'): number => {
  const poss = getComputedStyle(element)[attr];
  return parseInt(poss.replace('px', ''));
}

export const setValue = (element: HTMLElement, value: number, attr: 'left'|'top'|'backgroundPositionX'|'backgroundPositionY'|'width'|'height' = 'left'): HTMLElement => {
  element.style[attr] = `${value}px`;
  return element;
}

export const isOverlaping = (boxA: boxItem, boxB: boxItem): boolean => {
  const leftX = Math.max(boxA.left, boxB.left);
  const rightX = Math.min(boxA.left + boxA.width, boxB.left+boxB.width); 
  const topY = Math.max(boxA.top, boxB.top);
  const bottomY = Math.min(boxA.top+boxA.height, boxB.top+boxB.height);
  return topY < bottomY && leftX < rightX;
}