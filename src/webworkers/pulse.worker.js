/* eslint-env browser */
import { pulseTimeout } from '../screens/gameplay/assets/gameplay_params';

let lastTime;
let counter = -1;
const collectFps = [];

setInterval(() => {
  let toPost = null;
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
      toPost = `${Math.round(
        (collectFps.reduce((count, { amount }) => count + amount, 0)
          / (currTime - collectFps[0].time))
          * 1000,
      )}fps, min: ${Math.round(
        collectFps.reduce((min, { value }) => (min < value ? min : value), Infinity),
      )}`;
      collectFps.shift();
    }
    counter = 0;
    lastTime = currTime;
  }
  postMessage(toPost);
}, pulseTimeout);
