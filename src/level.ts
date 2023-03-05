const MAP_CONTAINER_CLASS = 'map-container';

export interface MapConfig {
  box: {
    width:number,
      height: number,
      top: number,
      left: number,
  }
}

export class Level{
  private _map: string;
  private mapConfig: MapConfig;

  constructor(mapName: string, config: MapConfig){
    this._map = mapName;
    this.mapConfig = config;
  }

  getElement(): HTMLDivElement{
    const el = document.createElement('div');
    el.className = MAP_CONTAINER_CLASS;
    const map = document.createElement('div');
    map.className = this._map;
    el.appendChild(map);
    return el;
  }

  debug(){
    const test = document.createElement('div');
    test.id = 'test';
    test.style.backgroundColor = new URLSearchParams(window.location.search).get('bgc') ??'none';
    test.style.position = 'absolute';
    test.style.opacity = '50%';
    test.style.width = `${this.mapConfig.box.width}px`;
    test.style.height = `${this.mapConfig.box.height}px`;
    test.style.top = `${this.mapConfig.box.top}px`;
    test.style.left = `${this.mapConfig.box.left}px`;

    // screen.onResize(() => {
    //   const rzEl = document.getElementById('test');
    //   rzEl.style.top = `${Math.trunc(getHeight(screen.getSize().heightScreen))}px`;
    //   test.style.left = `${Math.trunc(getWidth(screen.getSize().widthScreen))}px`;
    // })


    document.body.append(test);
  }
}