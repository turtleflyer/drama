/* eslint-env browser */
import mugImg from './img/mug1.png';
import {
  makeUnit, registerEventType, fireEvent, eventChain,
} from './eventswork';

function appendPx(n) {
  return `${n}px`;
}

function makeScalable(element, s = 1) {
  element.scaleFactor = s;
  element.setSizePos = function ({
    left, top, width, height,
  }) {
    if (typeof left === 'number') {
      this.leftN = left;
      this.style.left = appendPx(left * this.scaleFactor);
    }
    if (typeof top === 'number') {
      this.topN = top;
      this.style.top = appendPx(top * this.scaleFactor);
    }
    if (typeof width === 'number') {
      this.widthN = width;
      this.style.width = appendPx(width * this.scaleFactor);
    }
    if (typeof height === 'number') {
      this.heightN = height;
      this.style.height = appendPx(height * this.scaleFactor);
    }
  };

  element.refreshScaleFactor = function (newScale) {
    if (this.style.left) {
      this.style.left = appendPx(this.leftN * newScale);
    }
    if (this.style.top) {
      this.style.top = appendPx(this.topN * newScale);
    }
    this.scaleFactor = s;
    if (this.style.width) {
      this.style.width = appendPx(this.widthN * newScale);
    }
    if (this.style.height) {
      this.style.height = appendPx(this.heightN * newScale);
    }
  };
  return element;
}

function BeerMug(left, top, width, height, scaleF) {
  const div = makeScalable(document.createElement('div'));
  div.setSizePos({
    left,
    top,
    width,
    height,
  });
  const img = document.createElement('img');
  img.src = mugImg;
  img.style.width = '100%';
  div.appendChild(img);
  return div;
}

const scene = document.querySelector('#scene');
const firstMug = BeerMug(0, 0, 50, null);

const beerBar = {
  className: 'main',
  nested: [
    scene,
    {
      className: 'beer-mug',
      nested: [firstMug],
    },
  ],
};

const mechanism = {
  registerEvents: {
    tick50: {
      createAction: (action) => {
        let time = Date.now();
        return (data) => {
          const { target, type } = data;
          action(data);
          window.setTimeout(() => {
            const prevTime = time;
            time = Date.now();
            fireEvent(target, type, { timeout: time - prevTime });
          }, 10);
        };
      },
    },
  },
};

export {
  scene, beerBar, mechanism, eventWorker,
};
