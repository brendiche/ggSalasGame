export const getRandomColor = (): string => {
  let color: number[] = [];
  for(let i = 0; i < 6; i++){
    color.push(Math.trunc(Math.random()*10))
  }
  return `#${color.join('')}`;
}

export const getAfineTransform = (a:number,b:number) => (x:number) => (a*x+b);