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

const commonParams = { scaleFactor: 1 };

function appendPx(n) {
  return `${n}px`;
}

class GameActor {
  constructor(node, position, scaleFactor = commonParams.scaleFactor) {
    this.node = node;
    this.scaleFactor = scaleFactor;
    this.linked = [];
    this.setPosition(position);
  }

  setPosition(position) {
    if (position) {
      // eslint-disable-next-line
      for (const prop of GameActor.props) {
        const style = position[prop];
        if (typeof style === 'number' || style === null) {
          this[prop] = style;
          this.node.style[prop] = style === null ? null : appendPx(position[prop] * this.scaleFactor);
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
GameActor.props = ['left', 'top', 'width', 'height', 'bottom', 'right'];

function getUnit(name) {
  return registeredUnits[name];
}

function parseDescription(description) {
  const seeds = [];
  Object.entries(description).forEach(([nameOfUnit, unitDescription]) => {
    seeds.push(
      new class UnitDescriptor {
        constructor(toParse) {
          this.startChain = this.startChain.bind(this);
          let getList = () => [];
          Object.entries(toParse).forEach(([key, body]) => {
            switch (key) {
              case 'nested': {
                if (typeof body === 'function') {
                  getList = body.bind(this);
                } else {
                  getList = () => body;
                }
                break;
              }

              case 'mechanism':
                this.mechanism = {};
                Object.entries(body).forEach(([name, behave]) => {
                  this.mechanism = { ...this.mechanism, [name]: behave };
                  const {
                    action, customType, type, terminate,
                  } = behave;
                  if (action) {
                    this.mechanism[name].action = action.bind(this);
                  }
                  if (terminate) {
                    this.mechanism[name].terminate = (...arg) => (() => this.toTerminate) || terminate.apply(this, arg);
                  } else {
                    this.mechanism[name].terminate = () => this.toTerminate;
                  }
                  if (customType) {
                    registerEventType(type);
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
          });
          if (!this.initialize) {
            this.initialize = [this.startChain];
          } else {
            this.initialize = [this.initialize];
          }
          this.initialize.unshift(() => {
            this.unit = makeUnit(
              getList().map((e) => {
                if (e.node) {
                  e.node.classList.add(nameOfUnit);
                }
                return e;
              }),
            );
            registeredUnits[nameOfUnit] = this.unit;
            this.unit.name = nameOfUnit;
            this.unit.description = this;
          });
          this.toTerminate = false;
        }

        startChain(...names) {
          if (this.mechanism) {
            let getList = names;
            if (names.length === 0) {
              getList = Object.keys(this.mechanism);
            }
            getList.forEach((a) => {
              const {
                type, action, terminate, fireImmediately,
              } = this.mechanism[a];
              const { unit } = this;
              if (action) {
                eventChain(
                  {
                    unit,
                    type,
                    action,
                    terminate,
                  },
                  Symbol(a),
                );
                if (fireImmediately) {
                  fireEvent(unit, type);
                }
              }
            });
          }
        }
      }(unitDescription),
    );
  });
  return seeds;
}

function startModules(...modules) {
  const allModules = [].concat(...modules);
  function lunchFromInit(i) {
    allModules.forEach((m) => {
      const { initialize } = m;
      initialize[i]();
    });
  }
  lunchFromInit(0);
  lunchFromInit(1);
}

export {
  commonParams, getUnit, GameActor, parseDescription, startModules,
};
