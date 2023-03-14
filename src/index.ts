import './assets/main.css';
import './assets/maps/maps.css'; // TODO 2023-02-08  this will be moved somewhere else
import { Character } from './characters/character';
import { Engine } from './core/engine';
import { GameManager } from './core/gameManager';
import { Dialog } from './dialog';
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

const firstLevel = new Level('room', firstLevelConfig, screen)
const character = new Character('ggsalas',engine, firstLevel.getOffset().top, firstLevel.getOffset().left);


/**
 * 
*/

const gameManager = new GameManager(engine, firstLevel, character);
gameManager.init()

const dialog = new Dialog({
  height: 100,
  width: 569,
  top: firstLevel.getOffset().top+276,
  left:firstLevel.getOffset().left
},['Bienvenu dans le monde mervielleux de GGsalas!', 'C\'est cool de pouvoir tester']);
document.body.appendChild(dialog.createBox());
dialog.writeText();

