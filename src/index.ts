import './assets/main.css';
import './assets/maps/maps.css'; // TODO 2023-02-08  this will be moved somewhere else
import { Character } from './characters/character';
import { Engine } from './core/engine';
import { GameManager } from './core/gameManager';
import { Level, MapConfig } from './level/level';
import { firstLevelConfigParms, itemsConfigParams } from './level/levelConfigs';
import { Screen } from './screen';

const screen = new Screen();
const engine = new Engine();

/**
 * This will going in a senario class
 */

const firstLevelConfig: MapConfig = {
  box: firstLevelConfigParms,
  items: itemsConfigParams
}
// TODO 2023-03-08 move this somewhere else !!!! 
const top = Math.trunc(firstLevelConfig.box.top(screen.getSize().heightScreen))
const left = Math.trunc(firstLevelConfig.box.left(screen.getSize().widthScreen))
//

const firstLevel = new Level('room', firstLevelConfig, screen)
const character = new Character('ggsalas',engine, top, left);


/**
 * 
*/

const gameManager = new GameManager(engine, firstLevel, character);
gameManager.init()

