/* eslint-env browser */
import './styles.css';
import './index.html';
import { commonParams, startModules, getUnit } from './gamelibrary';
import { toCommonParams } from './usingparams';

import StopButton from './debug/StopButton';
import LevelForm from './debug/LevelForm';
import { startLevel } from './start';
import Scene from './units/Scene';
import AllUnits from './powerUnits/AllUnits';

Object.assign(commonParams, toCommonParams);

startLevel(0);

startModules(Scene, AllUnits);

// debug section
startModules(StopButton, LevelForm);

// console.log("'getUnit('FallenMug'): '", getUnit('FallenMug'));
