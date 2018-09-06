/* eslint-env browser */
import './styles.css';
import './index.html';
import {
  defineRoutine, makeUnit, registerEventType, fireEvent, eventChain,
} from './eventswork';
import {
  appendPx,
  GameActor,
  setOrigin,
  parseDescription,
  startModules,
  makeScalable,
} from './gamelabrary';
import ServiceUnit from './ServiceUnit/ServiceUnit';
import BeerMug from './elements/BeerMug/BeerMug';
import Scene from './elements/Scene/Scene';

setOrigin(document.querySelector('#scene'));

startModules(ServiceUnit, BeerMug, Scene);
