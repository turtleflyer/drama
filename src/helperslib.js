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

// export function fromLengthToNumber(str, u = 'px') {
//   return Number(str.replace(RegExp(u), ''));
// }

// export function fromNumberToLength(n, u = 'px') {
//   return n + u;
// }

// export function setPosition(element, { x, y }) {
//   const { x: currX, y: currY } = element.getBoundingClientRect();
//   const xOffset = currX - Number(element.offsetLeft);
//   const yOffset = currY - Number(element.offsetTop);
//   if (x) {
//     element.style.left = `${Number(x) - xOffset}px`;
//   }
//   if (y) {
//     element.style.top = `${Number(y) - yOffset}px`;
//   }
// }
