/* eslint-env browser */
import { pulseTimeout } from '../stage/gameplay_params';
import { calculateFPS } from '../libs/helpers_lib';

const fpsGen = calculateFPS(63, 50);
fpsGen.next();

setInterval(() => {
  let toPost = null;
  const fpsData = fpsGen.next(performance.now()).value;
  if (fpsData) {
    const { averageFPS, minFPS } = fpsData;
    toPost = `${Math.round(averageFPS)}fps, min: ${Math.round(minFPS)}fps`;
  }
  postMessage(toPost);
}, pulseTimeout);
