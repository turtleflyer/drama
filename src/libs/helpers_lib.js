/* eslint-env browser */
import { Actor, registerActionOfType } from './actors_and_roles';

export function importAll(r) {
  const a = [];
  r.keys().forEach((p) => {
    a.push(r(p));
  });
  return a;
}

export function updateStyle(obj, style) {
  let getNode = obj;
  if (obj instanceof Actor) {
    getNode = obj.node;
  }
  Object.assign(getNode.style, style);
}

export function setImg(element, newImg, style) {
  let { img } = element;
  if (!img) {
    img = document.createElement('img');
    img.src = newImg;
    updateStyle(img, style);
    element.node.appendChild(img);
    element.img = img;
  } else {
    img.src = newImg;
    updateStyle(img, style);
  }
  return element;
}

export function percentOverlap(targetBound, dragBound) {
  function linearOverlap(s1, e1, s2, e2) {
    const o = Math.min(e1, e2) - Math.max(s1, s2);
    return o < 0 ? 0 : o;
  }

  const {
    left: tLeft, top: tTop, right: tRight, bottom: tBottom,
  } = targetBound;
  const {
    left: dLeft, top: dTop, right: dRight, bottom: dBottom, width, height,
  } = dragBound;
  const dragArea = width * height;
  // prettier-ignore
  const overlapArea = linearOverlap(tLeft, tRight, dLeft, dRight)
    * linearOverlap(tTop, tBottom, dTop, dBottom);
  return overlapArea && overlapArea / dragArea;
}

export function removeAfterAnimationEnds(rs) {
  registerActionOfType('animationend', rs, {
    action({ roleSet, target }) {
      roleSet.deleteElement(target);
      target.remove();
    },
  }).start();
}

export function* calculateFPS(length, intervalForMin) {
  const seq = [];
  let time = yield null;
  while (typeof time === 'number') {
    seq.push(time);
    if (seq.length < length) {
      time = yield null;
    } else {
      if (seq.length > length) {
        seq.shift();
      }
      const averageFPS = ((length - 1) / (seq[length - 1] - seq[0])) * 1000;
      const minFPS = seq.reduce(
        ({ min, curSeq }, t) => {
          let startI = curSeq.length - 1;
          let checkFPS;
          let newSeq;
          while (typeof curSeq[startI] === 'number' && t - curSeq[startI] < intervalForMin) {
            startI--;
          }
          if (typeof curSeq[startI] === 'number') {
            newSeq = curSeq.slice(startI);
            checkFPS = (newSeq.length / (t - newSeq[0])) * 1000;
          } else {
            newSeq = [...curSeq];
          }
          newSeq.push(t);
          return { min: !checkFPS || (min && min < checkFPS) ? min : checkFPS, curSeq: newSeq };
        },
        { min: null, curSeq: [] },
      ).min;
      time = yield { averageFPS, minFPS };
    }
  }
}
