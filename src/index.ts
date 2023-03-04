import './assets/main.css';
import './assets/maps/maps.css';
import { Level } from './level';

/**
 * This will going in a senario class
 */
const firstLevel = new Level()
firstLevel.map('room');
/**
 * 
 */

document.body.appendChild(firstLevel.getElement());