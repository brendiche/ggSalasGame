import './assets/main.css';
import './assets/maps/maps.css'; // TODO 2023-02-08  this will be moved somewhere else
import { Character } from './characters/character';
import { Engine } from './core/engine';
import { GameManager } from './core/gameManager';
import { Dialog } from './core/dialog';
import { Level, MapConfig } from './level/level';
import { firstLevelConfigParms, itemsConfigParams } from './level/levelConfigs';
import { Screen } from './core/screen';
import { Interaction } from './core/interaction';

const screen = new Screen();
const engine = new Engine();

/**
 * This will going in a senario class
 */

const firstLevelConfig: MapConfig = {
  box: firstLevelConfigParms,
  items: itemsConfigParams
}

const firstLevel = new Level('room', firstLevelConfig, screen)
const character = new Character('ggsalas',engine, firstLevel.getOffset().top, firstLevel.getOffset().left);


/**
 * 
*/

const gameManager = new GameManager(engine, firstLevel, character);
gameManager.init();


