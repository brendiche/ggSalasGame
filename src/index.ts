import './assets/main.css';
import { Engine } from './core/engine';
import { Screen } from './core/screen';
import { InitScenario } from './scenarios/init';

const screen = new Screen();
const engine = new Engine();

const initScenario = new InitScenario(screen, engine);
initScenario.init();
// const studio = new Level({
//   className: 'studio',
//   box: studioLevelConfigParams,
//   items: studioItemsConfigParams,
// }, screen);
// document.body.append(studio.getLevel());
// studio.display();