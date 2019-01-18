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
  if (!element.img) {
    const img = document.createElement('img');
    img.src = newImg;
    updateStyle(img, style);
    element.node.appendChild(img);
    element.img = img;
  } else {
    element.img.src = newImg;
    updateStyle(element.img, style);
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
