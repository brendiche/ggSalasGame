export interface box {
  height: number,
  width: number,
  left: (x:number) => number,
  top: (x: number) => number,
}