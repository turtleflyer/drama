/* eslint-env browser */
import { pulseTimeout } from '../stage/gameplay_params';
import { calculateFPS } from '../libs/helpers_lib';

let fpsGen;

onmessage = ({ data: { evaluateFps } }) => {
  if (evaluateFps) {
    fpsGen = calculateFPS(63, 50);
    fpsGen.next();
  } else {
    fpsGen = null;
  }
};

setInterval(() => {
  postMessage(fpsGen && fpsGen.next(performance.now()).value);
}, pulseTimeout);
