import {
  makeUnit,
  registerUnit,
  getRegisteredUnit,
  registerEventType,
  fireEvent,
  eventChain,
} from './eventswork';

let origin;

const registeredUnites = {};

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

function setOrigin(element) {
  origin = element;
}

function parseDescription(description) {
  const {
    name, render, nested, mechanism,
  } = description;
  if (render) {
    description.render = render.bind(description, origin);
  }
  let list;
  if (nested) {
    if (typeof nested === 'function') {
      list = nested();
    } else {
      list = nested;
    }
    list = list.map((e) => {
      if (!(typeof e.has === 'function')) {
        e.className = name;
      }
      return e;
    });
  } else {
    list = [];
  }
  const unit = makeUnit(list);
  registeredUnites[description.name] = unit;
  if (mechanism) {
    Object.entries(mechanism).forEach(([type, { regAsCustom, action, fireImmediately }]) => {
      if (regAsCustom) {
        registerEventType(type);
      }
      if (action) {
        action = action.bind(description);
        eventChain({ unit, type, action }, fireImmediately);
      }
    });
  }
}

export {
  registeredUnites, appendPx, makeScalable, setOrigin, parseDescription,
};
