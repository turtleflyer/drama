/* eslint-env browser */
import './styles.css';
import './index.html';
import { commonParams, startModules } from './gamelibrary';

import ServiceUnit from './units/ServiceUnit';
import MugsOnLine from './units/MugsOnLine';
import Scene from './units/Scene';
import DragMug from './units/DragMug';
import Faucets from './units/Faucets';
import MugFilling from './units/MugFilling';

Object.assign(commonParams, {
  origin: document.querySelector('#scene'),
  tickTimeout: 5,
  scaleFactor: 1,
  sceneWidth: 1024,
  sceneHeight: 640,
  level: 0,
});

startModules(ServiceUnit, MugsOnLine, DragMug, Faucets, MugFilling, Scene);
