function appendPx(n) {
  return `${n}px`;
}

function makeScalable(element, s = 1) {
  const mappedProps = new Map([
    ['left', 'leftN'],
    ['top', 'topN'],
    ['width', 'widthN'],
    ['height', 'heightN'],
  ]);
  element.scaleFactor = s;
  element.setSizePos = function (data) {
    // eslint-disable-next-line
    for (const e of mappedProps.entries()) {
      const [out, inside] = e;
      if (typeof data[out] === 'number') {
        this[inside] = data[out];
        this.style[out] = appendPx(data[out] * this.scaleFactor);
      }
    }
  };

  element.refreshScaleFactor = function (newScale) {
    // eslint-disable-next-line
    for (const e of mappedProps.entries()) {
      const [out, inside] = e;
      if (this.style[out]) {
        this.style[out] = appendPx(this[inside] * newScale);
      }
    }
  };
  return element;
}

export { appendPx, makeScalable };
