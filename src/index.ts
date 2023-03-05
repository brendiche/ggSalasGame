import './assets/main.css';
import './assets/maps/maps.css';
import { Level } from './level';
import { Screen } from './screen';

const screen = new Screen();

/**
 * This will going in a senario class
 */
const firstLevel = new Level()
firstLevel.map('room');
/**
 * 
 */

document.body.appendChild(firstLevel.getElement());

/** test zone */
const getWidth = (w:number) => ((180/359)*w - (104172/359));
const getHeight = (h:number) => ((1/2)*h - (192));

const heightMap = 352;
const widthMap = 577;

const {heightScreen, widthScreen} = screen.getSize();

const test = document.createElement('div');
test.id = 'test';
test.style.backgroundColor = new URLSearchParams(window.location.search).get('bgc') ??'none';
test.style.width = `${widthMap}px`;
test.style.height = `${heightMap}px`;
test.style.position = 'absolute';
test.style.top = `${Math.trunc(getHeight(heightScreen))}px`;
test.style.left = `${Math.trunc(getWidth(widthScreen))}px`;
test.style.opacity = '50%';

screen.onResize(() => {
  const rzEl = document.getElementById('test');
  rzEl.style.top = `${Math.trunc(getHeight(screen.getSize().heightScreen))}px`;
  test.style.left = `${Math.trunc(getWidth(screen.getSize().widthScreen))}px`;
})


document.body.append(test);

/** end test zone */