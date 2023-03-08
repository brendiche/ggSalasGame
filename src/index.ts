import './assets/main.css';
import './assets/maps/maps.css'; // TODO 2023-02-08  this will be moved somewhere else
import { Character } from './characters/character';
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
const character = new Character('ggsalas');
/**
 * 
*/

document.body.appendChild(firstLevel.getElement());
document.body.appendChild(character.getCharacter());


firstLevel.debug();

// const ggSalasstand = document.createElement('div');
// ggSalasstand.className = 'ggsalas-stand';
// document.body.appendChild(ggSalasstand);
// const ggSalasleft = document.createElement('div');
// ggSalasleft.className = 'ggsalas-left';
// ggSalasleft.style.top = `${64*1}px`;
// document.body.appendChild(ggSalasleft);
// const ggSalasright = document.createElement('div');
// ggSalasright.className = 'ggsalas-right';
// ggSalasright.style.top = `${64*2}px`;
// document.body.appendChild(ggSalasright);
// const ggSalasdown = document.createElement('div');
// ggSalasdown.className = 'ggsalas-down';
// ggSalasdown.style.top = `${64*3}px`;
// document.body.appendChild(ggSalasdown);
// const ggSalastop = document.createElement('div');
// ggSalastop.className = 'ggsalas-top';
// ggSalastop.style.top = `${64*4}px`;
// document.body.appendChild(ggSalastop);

// const tool = document.createElement('div');
// tool.style.position = 'absolute';
// tool.style.width = '64px';
// tool.style.height = '64px';
// tool.style.backgroundColor = 'white';
// tool.style.opacity = '60%';
// document.body.appendChild(tool);

