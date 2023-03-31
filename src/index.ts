import './assets/main.css';
import './assets/maps/maps.css'; // TODO 2023-02-08  this will be moved somewhere else
import { Character } from './characters/character';
import { Engine } from './core/engine';
import { GameManager } from './core/gameManager';
import { Level, MapConfig } from './level/level';
import { firstLevelConfigParms, itemsConfigParams } from './level/levelConfigs';
import { Screen } from './core/screen';
import { InitScenario } from './scenarios/init';

const screen = new Screen();
const engine = new Engine();

const initScenario = new InitScenario(screen, engine);