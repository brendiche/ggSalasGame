import './assets/main.css';
import { Character } from './characters/character';
import { Engine } from './core/engine';
import { GameManager } from './core/gameManager';
import { Screen } from './core/screen';
import { Level } from './level/level';
import { charInitialRoomPoss, roomLevelMapConfig } from './level/levelConfigs';
import { InitScenario } from './scenarios/init';

const screen = new Screen();
const engine = new Engine();

const initScenario = new InitScenario(screen, engine);
initScenario.init();

// const roomLevel = new Level(roomLevelMapConfig, screen);
// roomLevel.display();
// // roomLevel.debug();
// const character = new Character('ggsalas', engine);
// character.display(
//   charInitialRoomPoss(roomLevel.getOffset()).a, // rename this
//   charInitialRoomPoss(roomLevel.getOffset()).b
// );
// // character.debug();
// const gameManager = new GameManager(engine, roomLevel, character);
// gameManager.init();
