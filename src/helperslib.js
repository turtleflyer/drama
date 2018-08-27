export function fromLengthToNumber(str, u = 'px') {
  return Number(str.replace(RegExp(u), ''));
}

export function fromNumberToLength(n, u = 'px') {
  return n + u;
}

export function setPosition(element, { x, y }) {
  const { x: currX, y: currY } = element.getBoundingClientRect();
  const xOffset = currX - Number(element.offsetLeft) + 45;
  const yOffset = currY - Number(element.offsetTop) + 60;
  element.style.left = `${Number(x) - xOffset}px`;
  element.style.top = `${Number(y) - yOffset}px`;
}
