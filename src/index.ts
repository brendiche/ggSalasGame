import './assets/main.css';
import './assets/maps/maps.css';
import { Level, MapConfig } from './level';
import { Screen } from './screen';

const screen = new Screen();

/**
 * This will going in a senario class
 */
const {heightScreen, widthScreen} = screen.getSize();
const getWidth = (w:number) => ((180/359)*w - (104172/359)); // TODO 2023-03-05 put this in helper file
const getHeight = (h:number) => ((1/2)*h - (192)); // TODO 2023-03-05 put this in helper file
const heightMap = 352; // TODO 2023-03-05 put this in config file
const widthMap = 577; // TODO 2023-03-05 put this in config file
const firstLevelConfig: MapConfig = {
  box:{
    height: heightMap,
    width: widthMap,
    left: Math.trunc(getWidth(widthScreen)),
    top: Math.trunc(getHeight(heightScreen)),
  }
}
const firstLevel = new Level('room', firstLevelConfig)
/**
 * 
*/

document.body.appendChild(firstLevel.getElement());
firstLevel.debug();
