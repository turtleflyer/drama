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

const registeredUnits = new Map();

const commonParams = {};

function appendPx(n) {
  return `${n}px`;
}

// function storeParam(toStore) {
//   Object.assign(commonParams, toStore);
// }

class GameActor {
  constructor(node, position, scaleFactor = 1) {
    this.node = node;
    this.scaleFactor = scaleFactor;
    this.linked = [];
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
    // eslint-disable-next-line
    for (const actor of [this].concat(this.linked)) {
      actor.scaleFactor = newScale;
      actor.setPosition(actor);
    }
  }

  linkActor(actor) {
    if (!(actor instanceof GameActor)) {
      throw new Error('Parameter should be an instance of GameActor class');
    }
    actor.refreshScale(this.scaleFactor);
    this.linked.push(actor);
  }
}
GameActor.props = ['left', 'top', 'width', 'height'];

function getUnit(name) {
  return registeredUnits[name];
}

function parseDescription(description) {
  const seeds = [];
  Object.entries(description).forEach(([nameOfUnit, unitDescription]) => {
    seeds.push(
      new class {
        constructor() {
          Object.entries(unitDescription).forEach(([key, body]) => {
            let list = [];
            switch (key) {
              case 'nested':
                if (typeof body === 'function') {
                  this.init = body.bind(this);
                } else {
                  list = body.map((e) => {
                    if (e.node) {
                      e.node.classList.add(nameOfUnit);
                    }
                    return e;
                  });
                }
                break;

              case 'mechanism':
                this.mechanism = {};
                Object.entries(body).forEach(([type, behave]) => {
                  this.mechanism = { ...this.mechanism, [type]: behave };
                  const { action } = behave;
                  if (action) {
                    this.mechanism[type].action = action.bind(this);
                  }
                });
                break;

              default:
                if (typeof body === 'function') {
                  this[key] = body.bind(this);
                } else {
                  this[key] = body;
                }
                break;
            }
            this.unit = makeUnit(list);
            registeredUnits[nameOfUnit] = this.unit;
            this.unit.name = nameOfUnit;
          });
        }
      }(description),
    );
  });
  return seeds;
}

function startModules(...modules) {
  const combinedModules = [].concat(...modules);
  combinedModules.forEach(({ init, unit, mechanism }) => {
    if (init) {
      init().map((e) => {
        if (e.node) {
          e.node.classList.add(unit.name);
        }
        unit.addElement(e);
        return e;
      });
    }
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
  commonParams, getUnit, appendPx, GameActor, parseDescription, startModules,
};
