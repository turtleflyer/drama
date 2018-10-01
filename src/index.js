/* eslint-env browser */
import './styles.css';
import './index.html';
import { commonParams, startModules } from './gamelibrary';

// import ServiceUnit from './units/ServiceUnit';
import MugsOnLine from './units/MugsOnLine';
import Scene from './units/Scene';
import DragMug from './units/DragMug';
import Faucets from './units/Faucets';
import BeerJet from './units/BeerJet';
import Damages from './units/Damages';
import MugFilling from './units/MugFilling';
import Score from './units/Score';

Object.assign(commonParams, {
  scene: document.querySelector('#scene'),
  tickTimeout: 5,
  sceneWidth: 1024,
  sceneHeight: 640,
  level: 0,
});

startModules(
  // ServiceUnit,
  MugsOnLine,
  DragMug,
  Faucets,
  BeerJet,
  Damages,
  MugFilling,
  Score,
  Scene,
);
