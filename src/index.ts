import './assets/main.css';
import { Character } from './characters/character';
import { Engine } from './core/engine';
import { GameManager } from './core/gameManager';
import { showForm, getMessages } from './core/goldenBook';
import { Screen } from './core/screen';
import { getParams } from './helper';
import { Level } from './level/level';
import { charInitialRoomPoss, roomLevelMapConfig } from './level/levelConfigs';
import { InitScenario } from './scenarios/init';

const screen = new Screen();
if (screen.isSizeValid() && !screen.mobileAndTabletCheck()) {
  const params = getParams();
  if (params?.goldenBook) {
    console.log('golden book');
    showForm();
  } else {
    const engine = new Engine();

    const initScenario = new InitScenario(screen, engine);
    initScenario.init();
  }
} else {
  console.log('GET THE GOOD DEVICE');
  const goodbyeText = document.createTextNode(
    'Ce jeu est uniquement disponible sur PC'
  );
  const container = document.createElement('div');
  container.className = 'txt';
  container.appendChild(goodbyeText);
  document.body.append(container);
}

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
