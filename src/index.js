/* eslint-env browser */
import './styles.css';
import './index.html';
import {
  defineRoutine, makeUnit, registerEventType, fireEvent, eventChain,
} from './eventswork';
import {
  commonParams,
  getUnit,
  appendPx,
  GameActor,
  parseDescription,
  startModules,
} from './gamelibrary';

import ServiceUnit from './ServiceUnit/ServiceUnit';
import MugsOnLine from './units/MugsOnLine/MugsOnLine';
import Scene from './units/Scene/Scene';
import DragMug from './units/DragMug/DragMug';
import Faucets from './units/Faucets/Faucets';

// import mugIPA from './elements/BeerMug/mug1.png';

Object.assign(commonParams, {
  origin: document.querySelector('#scene'),
  tickTimeout: 5,
  scaleFactor: 1,
  sceneWidth: 1024,
  sceneHeight: 640,
  level: 0,
});

startModules(ServiceUnit, MugsOnLine, DragMug, Faucets, Scene);

// const scene = document.querySelector('#scene').cloneNode();
// document.body.appendChild(scene);
// Object.assign(scene.style, {
//   width: appendPx(commonParams.sceneWidth),
//   height: appendPx(commonParams.sceneHeight),
// });

// function render(left, top, scaleF) {
//   const element = document.createElement('div');
//   Object.assign(element.style, { width: appendPx(50), left: appendPx(left), top: appendPx(top) });
//   const img = document.createElement('img');
//   img.src = mugIPA;
//   img.style.width = '100%';
//   element.appendChild(img);
//   scene.appendChild(element);
//   return element;
// }

// function getWithoutPx(string) {
//   return Number(string.replace(/px/, ''));
// }

// const memory = {};
// const mugs = new Set();
// let a = 0;

// function action(target) {
//   const curTime = Date.now();
//   if (!target) {
//     a = curTime;
//     const newB = render(commonParams.sceneWidth, 200);
//     memory.newborn = memory.foremost = newB;
//     // newB.lastMove = curTime;
//     mugs.add(newB);
//   } else {
//     const curL = getWithoutPx(target.style.left);
//     if (target === memory.foremost) {
//       memory.speed = commonParams.mugSpeed - ((curTime - a) * 1) / 1000;
//     }
//     if (curL <= -getWithoutPx(target.style.width)) {
//       target.remove();
//       memory.foremost = target.nextInLine;
//       mugs.delete(target);
//     } else {
//       // const newL = curL + ((curTime - target.lastMove) * memory.speed) / 1000;
//       const newL = curL + (commonParams.tickTimeout * memory.speed) / 1000;
//       Object.assign(target.style, { left: appendPx(newL) });
//       // target.lastMove = curTime;
//       if (target === memory.newborn) {
//         const possibleP = newL + getWithoutPx(target.style.width) + 5;
//         if (possibleP < commonParams.sceneWidth) {
//           const newB = render(possibleP, 200);
//           target.nextInLine = memory.newborn = newB;
//           // newB.lastMove = curTime;
//           mugs.add(newB);
//         }
//       }
//     }
//   }
// }

// action();

// window.setInterval(() => {
//   [...mugs].forEach(m => action(m));
// }, commonParams.tickTimeout);
