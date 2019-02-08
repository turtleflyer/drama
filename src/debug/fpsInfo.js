/* eslint-env browser */
import { ActorsSet } from '../libs/actors_and_roles';
import { onPulseTick } from '../stage/role_classes';
import { calculateFPS } from '../libs/helpers_lib';

export const fpsInfo = document.createElement('div');
export const fpsSet = new ActorsSet([fpsInfo]);
export const debugPulse = {};

const fpsGen = calculateFPS(63, 50);
fpsGen.next();

onPulseTick
  .registerAction(fpsSet, {
    action() {
      const fpsData = fpsGen.next(performance.now()).value;
      if (fpsData) {
        const { averageFPS, minFPS } = fpsData;
        fpsInfo.innerText = `Actual fps: ${Math.round(averageFPS)}fps, min: ${Math.round(
          minFPS,
        )}fps\r\nGenerated fps: ${debugPulse.info || 'evaluating'}`;
      } else {
        fpsInfo.innerText = `Actual fps: evaluating\r\nGenerated fps: ${debugPulse.info
          || 'evaluating'}`;
      }
    },
  })
  .start();
