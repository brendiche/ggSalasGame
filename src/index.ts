import './assets/main.css';
import './assets/maps/maps.css';
import { getRandomColor } from './helper';
import { Level, MapConfig } from './level/level';
import { firstLevelConfigParms } from './level/levelConfigs';
import { Screen } from './screen';

const screen = new Screen();

/**
 * This will going in a senario class
 */

const firstLevelConfig: MapConfig = {
  box: firstLevelConfigParms,
}
const firstLevel = new Level('room', firstLevelConfig, screen)

/**
 * 
*/

document.body.appendChild(firstLevel.getElement());
firstLevel.debug();


///////////////
const test = document.createElement('div');
test.id='test2'
test.style.backgroundColor = getRandomColor();
test.style.position = 'absolute';
// test.style.opacity = '50%';
test.style.width = `500px`;
test.style.height = `500px`;
test.style.top = `10px`;
test.style.left = `10px`;

// document.body.appendChild(test);$