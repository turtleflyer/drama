/* eslint-env browser */
import { ActorsSet } from '../libs/actors_and_roles';
import { onPulseTick } from '../stage/role_classes';

export const fpsInfo = document.createElement('div');
export const fpsSet = new ActorsSet([fpsInfo]);
export const debugPulse = {};

let lastTime;
let counter = -1;
const collectFps = [];

onPulseTick
  .registerAction(fpsSet, {
    action() {
      counter++;
      const currTime = Date.now();
      if (!lastTime) {
        lastTime = currTime;
      } else if (currTime - lastTime > 17) {
        collectFps.push({
          value: (counter / (currTime - lastTime)) * 1000,
          time: currTime,
          amount: counter,
        });
        if (collectFps.length > 200) {
          fpsInfo.innerText = `Actual fps: ${Math.round(
            (collectFps.reduce((count, { amount }) => count + amount, 0)
              / (currTime - collectFps[0].time))
              * 1000,
          )}fps, min: ${Math.round(
            collectFps.reduce((min, { value }) => (min < value ? min : value), Infinity),
          )}\r\nGenerated fps: ${debugPulse.info || 'evaluating'}`;
          collectFps.shift();
        } else {
          fpsInfo.innerText = `Actual fps: evaluating\r\nGenerated fps: ${debugPulse.info
            || 'evaluating'}`;
        }
        counter = 0;
        lastTime = currTime;
      }
    },
  })
  .start();
