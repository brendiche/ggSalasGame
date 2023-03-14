export interface box {
  height: number,
  width: number,
  left: (x:number) => number,
  top: (x: number) => number,
}

export interface boxItem extends Omit<box, 'left' | 'top'>{
  left: number,
  top:number
}

export type Direction = 'top' | 'down' | 'right' | 'left' | 'stand';