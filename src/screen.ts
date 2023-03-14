export class Screen {
  private _width: number;
  private _hieght: number;


  constructor(){
    this._width = window.innerWidth;
    this._hieght = window.innerHeight;
    window.addEventListener('resize', ()=> {
      this._hieght = window.innerHeight;
      this._width = window.innerWidth;
    });
  }

  getSize(){
    return {
      widthScreen: this._width,
      heightScreen: this._hieght,
    };
  }

  onResize(cb: () => void){
    window.addEventListener('resize', cb);
  }
}