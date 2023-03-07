import './assets/main.css';
import './assets/maps/maps.css';
import { Level, MapConfig } from './level/level';
import { firstLevelConfigParms, itemsConfigParams } from './level/levelConfigs';
import { Screen } from './screen';

const screen = new Screen();

/**
 * This will going in a senario class
 */

const firstLevelConfig: MapConfig = {
  box: firstLevelConfigParms,
  items: itemsConfigParams
}
const firstLevel = new Level('room', firstLevelConfig, screen)

/**
 * 
*/

document.body.appendChild(firstLevel.getElement());
firstLevel.debug();

