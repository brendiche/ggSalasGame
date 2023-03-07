export interface box {
  height: number,
  width: number,
  left: (x:number) => number,
  top: (x: number) => number,
}

export interface boxItems extends Omit<box, 'left' | 'top'>{
  left: number,
  top:number
}