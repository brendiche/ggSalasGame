import { getRandomColor } from "../helper";
import { Screen } from "../screen";
import { box, boxItem } from "../types";

const MAP_CONTAINER_CLASS = 'map-container';
export interface OffsetMap {
  top: number;
  left: number;
}
export interface MapConfig {
  box: box;
  items: boxItem[],
}

export class Level {
  private _map: string;
  private readonly screen: Screen;
  private mapConfig: MapConfig;

  constructor(mapName: string, config: MapConfig, screen: Screen){
    this.screen = screen;
    this._map = mapName;
    this.mapConfig = config;
  }

  getLevel(): HTMLDivElement{
    const el = document.createElement('div');
    el.className = MAP_CONTAINER_CLASS;
    const map = document.createElement('div');
    map.className = this._map;
    el.appendChild(map);
    return el;
  }

  getItems(): boxItem[]{
    return this.mapConfig.items;
  }

  getOffset(): OffsetMap{
    return {
      top: Math.trunc(this.mapConfig.box.top(this.screen.getSize().heightScreen)),
      left:  Math.trunc(this.mapConfig.box.left(this.screen.getSize().widthScreen))
    }
  }

  debug(){
    const test = document.createElement('div');
    test.id = 'test';
    test.style.backgroundColor = new URLSearchParams(window.location.search).get('bgc') ??'none';
    test.style.position = 'absolute';
    test.style.opacity = '50%';
    test.style.width = `${this.mapConfig.box.width}px`;
    test.style.height = `${this.mapConfig.box.height}px`;
    test.style.top = `${this.mapConfig.box.top(this.screen.getSize().heightScreen)}px`;
    test.style.left = `${this.mapConfig.box.left(this.screen.getSize().widthScreen)}px`;

    this.screen.onResize(() => {
      const rzEl = document.getElementById('test');
      rzEl.style.top = `${Math.trunc(this.mapConfig.box.top(this.screen.getSize().heightScreen))}px`;
      test.style.left = `${Math.trunc(this.mapConfig.box.left(this.screen.getSize().widthScreen))}px`;
    })


    document.body.append(test);

    if(new URLSearchParams(window.location.search).get('debug')){
      const top = Math.trunc(this.mapConfig.box.top(this.screen.getSize().heightScreen))
      const left = Math.trunc(this.mapConfig.box.left(this.screen.getSize().widthScreen))
  
      this.mapConfig.items.forEach((item, i) => {
        const test = document.createElement('div');
        test.id=`test${2+i}`
        test.style.backgroundColor = getRandomColor();
        test.style.position = 'absolute';
        test.style.opacity = '80%';
        test.style.width = `${item.width}px`;
        test.style.height = `${item.height}px`;
        test.style.top = `${item.top+top}px`;
        test.style.left = `${item.left+left}px`;
        
        document.body.appendChild(test);
  
      })
    }
  }
}