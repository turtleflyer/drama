import {
  defineRoutine, eventChain, fireEvent, RoleSet,
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
  }

  refreshScale(newScale) {
    for (const actor of [this].concat(this.linked)) {
      actor.scaleF = newScale;
      actor.setPosition(actor);
    }
  }

  linkActor(actor) {
    if (!(actor instanceof Actor)) {
      throw new Error('Parameter should be an instance of GameActor class');
    }
    actor.refreshScale(this.scaleF);
    this.linked.push(actor);
  }

  remove() {
    this.node.remove();
  }
}
Actor.props = ['left', 'top', 'width', 'height', 'bottom', 'right'];

export class ActorsSet extends RoleSet {
  constructor(fill) {
    if (typeof fill === 'function') {
      super([]);
      this.fill = (...args) => {
        fill(...args).forEach((e) => {
          this.addElement(e);
        });
      };
    } else if (Array.isArray(fill)) {
      super(fill);
    } else {
      throw new Error('@@...');
    }
  }
}

export class RoleClass {
  constructor(type) {
    this.type = type;
  }

  registerAction(roleSet, { action, checkIfTerminate, initMemoryState }) {
    const roleSetter = this;
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
          memory: initMemoryState || {},
          roleSetter,
        });
      }

      start() {
        if (!active) {
          toTerminate = false;
          /* eslint-disable */
          const { actorsSet, type, action, checkIfTerminate, memory } = this;
          /* eslint-enable */
          eventChain({
            roleSet,
            type,
            action,
            checkIfTerminate,
          });
          active = true;
        }
      }

      fireItself(event) {
        this.roleSetter.fire(this.roleSet, event);
      }

      stop() {
        toTerminate = true;
        this.fireItself();
        active = false;
      }
    }();
  }

  fire(roleSet, event) {
    fireEvent(roleSet, this.type, event);
  }
}
