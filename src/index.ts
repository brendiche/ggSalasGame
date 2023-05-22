import './assets/main.css';
import './assets/sounds/ggsalas_txt.mp3';
import { EndCredit } from './core/endCredit';
import { Engine } from './core/engine';
import { showForm } from './core/goldenBook';
import { Screen } from './core/screen';
import { SoundPlayer } from './core/soundPlayer';
import { ActionBox } from './dialogs/actionBox';
import { BuzzDialog } from './dialogs/buzzDialog';
import { CharacterDialog } from './dialogs/characterDialog';
import { GgSalasDialog } from './dialogs/ggSalasDialog';
import { SenseiDialog } from './dialogs/senseiDialog';
import { getParams } from './helper';
import { Level } from './level/level';
import { dialogBoxRoom, roomLevelMapConfig } from './level/levelConfigs';
import { InitScenario } from './scenarios/init';

const screen = new Screen();
if (screen.isSizeValid() && !screen.mobileAndTabletCheck()) {
  const params = getParams();
  if (params?.goldenBook) {
    console.log('golden book');
    showForm();
  } else if (params?.endCredit) {
    const endCredit = new EndCredit();
    endCredit.display();
  } else if (params?.dev) {
    console.log('dev');
    const roomLevel = new Level(roomLevelMapConfig, screen);
    // const firstDialog = new CharacterDialog(
    //   [
    //     'Hein ??? Que s’est-il passé ???',
    //     'Vite ! Je dois terminer Galbadia Vol.3',
    //   ],
    //   'ggsalas-dresseur',
    //   new SoundPlayer('./src/assets/sounds/ggsalas_txt.mp3', {
    //     loop: true,
    //     volume: 0.1,
    //   })
    // );

    const firstDialog = new ActionBox('coucou');

    window.addEventListener('click', () => {
      firstDialog.createBox(dialogBoxRoom(roomLevel.getOffset()));
      firstDialog.display();
      firstDialog.writeText();
    });
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
