/* eslint-env browser */
import './styles.css';
import './index.html';
import { commonParams, startModules } from './gamelibrary';

import MugsOnLine from './units/MugsOnLine';
import Scene from './units/Scene';
import DragMug from './units/DragMug';
import Faucets from './units/Faucets';
import FaucetSwitches from './units/FaucetSwitches';
import MugPlaces from './units/MugPlaces';
import BeerJet from './units/BeerJet';
import Damages from './units/Damages';
import MugFilling from './units/MugFilling';
import Score from './units/Score';
import { toCommonParams } from './usingparams';

Object.assign(commonParams, toCommonParams);

startModules(
  MugsOnLine,
  DragMug,
  Faucets,
  FaucetSwitches,
  MugPlaces,
  BeerJet,
  Damages,
  MugFilling,
  Score,
  Scene,
);
