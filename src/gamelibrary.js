import {
  defineRoutine,
  makeUnit,
  registerEventType,
  fireEvent,
  eventChain,
  setActionOnAddedElement,
} from './eventswork';

const onAddElement = Symbol('@@onAddElement');

defineRoutine({
  interpretTarget: e => e.node,
  whenAddToUnit(e, unit) {
    if (e.node) {
      e.node.classList.add(this.name);
      if (unit) {
        e.node.classList.remove(unit.name);
      }
    }
  },
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
      for (const prop of GameActor.props) {
        const style = position[prop];
        if (typeof style === 'number' || style === null) {
          this[prop] = style;
          // prettier-ignore
          this.node.style[prop] = style === null
            ? null : appendPx(position[prop] * this.scaleFactor);
        }
      }
    }
  }

  refreshScale(newScale) {
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
      new class UnitDescription {
        constructor(toParse) {
          this.startChain = this.startChain.bind(this);
          let getElements = () => [];
          let whenAddToUnitAction;
          Object.entries(toParse).forEach(([key, body]) => {
            switch (key) {
              case 'nested': {
                if (typeof body === 'function') {
                  getElements = body.bind(this);
                } else {
                  getElements = () => body;
                }
                break;
              }

              case 'mechanism': {
                this.mechanism = {};
                const whenAddToUnit = body[onAddElement];
                if (whenAddToUnit) {
                  whenAddToUnitAction = whenAddToUnit.action;
                }
                Object.entries(body).forEach(([name, behave]) => {
                  const {
                    action, customType, type, terminate,
                  } = behave;
                  this.mechanism = { ...this.mechanism, [name]: behave };
                  if (action) {
                    this.mechanism[name].action = action.bind(this);
                  }
                  if (terminate) {
                    // prettier-ignore
                    this.mechanism[name].terminate = (...arg) => (() => this.toTerminate)
                      || terminate.apply(this, arg);
                  } else {
                    this.mechanism[name].terminate = () => this.toTerminate;
                  }
                  if (customType) {
                    registerEventType(type);
                  }
                });
                break;
              }

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
            this.initialize = { start: this.startChain };
          } else {
            this.initialize = { start: this.initialize };
          }
          this.initialize.buildUnit = () => {
            if (!this.unit) {
              const unit = makeUnit([]);
              registeredUnits[nameOfUnit] = unit;
              unit.name = nameOfUnit;
              unit.description = this;
              if (whenAddToUnitAction) {
                setActionOnAddedElement(unit, whenAddToUnitAction.bind(this));
              }
              this.unit = unit;
            }
            getElements().forEach((e) => {
              if (e.node) {
                e.node.classList.add(nameOfUnit);
              }
              this.unit.addElement(e);
            });
          };
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
  const lunchFromInit = {};
  ['start', 'buildUnit'].forEach((key) => {
    lunchFromInit[key] = () => {
      allModules.forEach((m) => {
        m.initialize[key]();
        m.toTerminate = false;
      });
    };
  });
  lunchFromInit.buildUnit();
  lunchFromInit.start();
}

export {
  onAddElement, commonParams, getUnit, GameActor, parseDescription, startModules,
};
