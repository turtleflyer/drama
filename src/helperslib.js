/* eslint-env browser */
export function importAll(r) {
  const a = [];
  r.keys().forEach((p) => {
    a.push(r(p));
  });
  return a;
}

export function updateStyle(node, style) {
  Object.assign(node.style, style);
}

export function setImg(element, newImg, style) {
  const img = document.createElement('img');
  img.src = newImg;
  updateStyle(img, style);
  element.node.appendChild(img);
  if (element.img) {
    element.img.remove();
  }
  element.img = img;
}

export function percentOverlap(targetBound, dragBound) {
  function linearOverlap(s1, e1, s2, e2) {
    const c = Math.min(e1 - s2, e2 - s1);
    return c < 0 ? 0 : c;
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
  return overlapArea / dragArea;
}
