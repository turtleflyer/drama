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
