import {
  defineRoutine, eventChain, fireEvent, RoleSet, waitWhenTypeExhausted,
} from './eventswork';

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

function appendPx(n) {
  return `${n}px`;
}

export class Actor {
  constructor(node, position, scaleF = 1) {
    this.node = node;
    this.scaleF = scaleF;
    this.linked = [];
    this.setPosition(position);
  }

  setPosition(position) {
    if (position) {
      for (const prop of Actor.props) {
        const style = position[prop];
        if (typeof style === 'number' || style === null) {
          this[prop] = style;
          // prettier-ignore
          this.node.style[prop] = style === null
            ? null : appendPx(position[prop] * this.scaleF);
        }
      }
    }
    return this;
  }

  refreshScale(newScale) {
    for (const actor of [this].concat(this.linked)) {
      actor.scaleF = newScale;
      actor.setPosition(actor);
    }
    return this;
  }

  linkActor(actor) {
    if (!(actor instanceof Actor)) {
      throw new Error('Parameter should be an instance of GameActor class');
    }
    actor.refreshScale(this.scaleF);
    this.linked.push(actor);
    return actor;
  }

  remove() {
    this.node.remove();
    return this;
  }
}
Actor.props = ['left', 'top', 'width', 'height', 'bottom', 'right'];

const classNamesMap = new Map();

export function attachClassName(element, className) {
  if (!(element instanceof Actor)) {
    throw new Error('@@...');
  }
  const { node } = element;
  const prevClassName = classNamesMap.get(element);
  if (prevClassName) {
    element.node.classList.remove(prevClassName);
  }
  node.classList.add(className);
  classNamesMap.set(element, className);
}

const registeredRoleClasses = new Map();

export class RoleClass {
  constructor(type) {
    if (typeof type === 'string') {
      const getClass = registeredRoleClasses.get(type);
      if (getClass) {
        return getClass;
      }
      registeredRoleClasses.set(type, this);
    }
    this.type = type;
  }

  registerAction(roleSet, { action, checkIfTerminate, initMemoryState }) {
    const roleClass = this;
    const { type } = this;
    let active = false;
    let toTerminate = false;
    return new class Role {
      constructor() {
        if (checkIfTerminate) {
          // prettier-ignore
          this.checkIfTerminate = (...args) => toTerminate
            || checkIfTerminate.bind(this)(...args);
        } else {
          this.checkIfTerminate = () => toTerminate;
        }
        Object.assign(this, {
          roleSet,
          type,
          action: action.bind(this),
          initMemoryState,
          roleClass,
        });
      }

      start() {
        if (!active) {
          toTerminate = false;
          // eslint-disable-next-line
          const { roleSet, type, action, checkIfTerminate, initMemoryState } = this;
          if (typeof initMemoryState === 'function') {
            this.memory = initMemoryState.call(this);
          } else if (initMemoryState) {
            this.memory = initMemoryState;
          } else {
            this.memory = {};
          }
          eventChain({
            roleSet,
            type,
            action,
            checkIfTerminate,
          });
          active = true;
        }
        return this;
      }

      fire(event) {
        this.roleClass.fire(this.roleSet, event);
        return this;
      }

      fireAndWaitWhenExhausted(event) {
        return this.roleClass.fireAndWaitWhenExhausted(this.roleSet, event);
      }

      stop() {
        toTerminate = true;
        this.fire();
        active = false;
        return this;
      }
    }();
  }

  fire(roleSet, event) {
    fireEvent(roleSet, this.type, event);
    return this;
  }

  fireAndWaitWhenExhausted(roleSet, event) {
    fireEvent(roleSet, this.type, event);
    const waitPromise = waitWhenTypeExhausted(this.type);
    return function (callback) {
      waitPromise.then(callback);
    };
  }
}

export function registerActionOfType(type, roleSet, { action, checkIfTerminate, initMemoryState }) {
  if (!(typeof type === 'string')) {
    throw new Error('@@@...');
  }
  return new RoleClass(type).registerAction(roleSet, { action, checkIfTerminate, initMemoryState });
}

export const initializerClass = new RoleClass(Symbol('@@ActorSet/initializerClass'));
const cleanerClass = new RoleClass(Symbol('@@ActorSet/cleanerClass'));

export class ActorsSet extends RoleSet {
  constructor(args) {
    super(args);
    this._cleaner = this.getCleaner();
    this._cleaner.start();
  }

  getInitializer(initialize) {
    if (initialize || !this._initializer) {
      if (this._initializer) {
        this._initializer.stop();
      }
      if (initialize) {
        this._initializer = initializerClass.registerAction(this, {
          action: ({ target }) => {
            if (!target) {
              initialize.call(this);
            }
          },
        });
      } else {
        this._initializer = initializerClass.registerAction(this, {
          action: () => null,
        });
      }
      this._initializer.fireThenStart = (role) => {
        this._initializer.fireAndWaitWhenExhausted().then(role.start);
      };
    }
    this._initializer.start();
    return this._initializer;
  }

  getCleaner() {
    return (
      this._cleaner
      || cleanerClass.registerAction(this, {
        action: () => {
          [...this].forEach((e) => {
            console.log('e: ', e);
            if (!(e instanceof RoleSet)) {
              if (e.node) {
                e.node.remove();
              }
              this.deleteElement(e);
            }
          });
        },
      })
    );
  }
}

const startType = Symbol('@@RolesManipulator/startType');
const stopType = Symbol('@@RolesManipulator/stopType');

export class RolesManipulator extends RoleSet {
  constructor(roles) {
    super(roles);
    eventChain({
      roleSet: this,
      type: startType,
      action: () => {
        [...this].forEach(role => role.start());
      },
    });
    eventChain({
      roleSet: this,
      type: stopType,
      action: () => {
        [...this].forEach(role => role.stop());
      },
    });
  }

  start() {
    fireEvent(this, startType);
    return this;
  }

  stop() {
    fireEvent(this, stopType);
    return this;
  }
}

export const debugSymbols = {};
