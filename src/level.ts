const MAP_CONTAINER_CLASS = 'map-container';

export class Level{
  private _map: string;

  map(className: string){
    this._map = className;
  }

  getElement(): HTMLDivElement{
    const el = document.createElement('div');
    el.className = MAP_CONTAINER_CLASS;
    const map = document.createElement('div');
    map.className = this._map;
    el.appendChild(map);
    return el;
  }
}