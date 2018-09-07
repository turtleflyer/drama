import {
  defineRoutine, makeUnit, registerEventType, fireEvent, eventChain,
} from './eventswork';

defineRoutine(e => e.node, function (e, unit) {
  if (e.node) {
    e.node.classList.add(this.name);
    if (unit) {
      e.node.classList.remove(unit.name);
    }
  }
});

let origin;

const registeredUnits = {};

function appendPx(n) {
  return `${n}px`;
}

class GameActor {
  constructor(node, scaleFactor = 1, position) {
    this.node = node;
    this.scaleFactor = scaleFactor;
    this.setPosition(position);
  }

  setPosition(position) {
    if (position) {
      // eslint-disable-next-line
      for (const prop of GameActor.props) {
        if (typeof position[prop] === 'number') {
          this[prop] = position[prop];
          this.node.style[prop] = appendPx(position[prop] * this.scaleFactor);
        }
      }
    }
  }

  refreshScale(newScale) {
    this.scaleFactor = newScale;
    this.setPosition(this);
  }
}
GameActor.props = ['left', 'top', 'width', 'height'];

function setOrigin(element) {
  origin = element;
}

function getUnit(name) {
  return registeredUnits[name];
}

function parseDescription(description) {
  const reservedPropNames = new Set(['nested', 'mechanism']);
  const seeds = [];
  Object.entries(description).forEach(([nameOfUnit, unitDescription]) => {
    seeds.push(
      new class {
        constructor() {
          const toolkit = {
            name: nameOfUnit,
            get origin() {
              return origin;
            },
            getUnit,
          };
          const { nested, mechanism } = unitDescription;
          Object.entries(unitDescription).forEach(([key, body]) => {
            if (!reservedPropNames.has(key)) {
              if (typeof body === 'function') {
                this[key] = body(toolkit).bind(this);
              }
            } else {
              this[key] = body;
            }
          });

          let list = [];
          if (nested) {
            if (typeof nested === 'function') {
              list = nested.bind(this)(toolkit) || list;
            } else {
              list = nested;
            }
            list.forEach((e) => {
              if (e.node) {
                e.node.classList.add(nameOfUnit);
              }
            });
          }
          this.unit = makeUnit(list);
          registeredUnits[nameOfUnit] = this.unit;
          this.unit.name = nameOfUnit;
          if (mechanism) {
            Object.entries(mechanism).forEach(([type, behave]) => {
              this.mechanism = { [type]: behave };
              const { action } = behave;
              if (action) {
                this.mechanism[type].action = action(toolkit).bind(this);
              }
            });
          }
        }
      }(description),
    );
  });
  return seeds;
}

function startModules(...modules) {
  const combinedModules = [].concat(...modules);
  combinedModules.forEach(({ unit, mechanism }) => {
    if (mechanism) {
      Object.entries(mechanism).forEach(([type, { regAsCustom, action, fireImmediately }]) => {
        if (regAsCustom) {
          registerEventType(type);
        }
        if (action) {
          eventChain({ unit, type, action }, fireImmediately);
        }
      });
    }
  });
}

export {
  appendPx, GameActor, setOrigin, parseDescription, startModules, makeScalable,
};
