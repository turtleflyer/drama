import { stageDimension } from '../../../../stage/gameplay_params';
import { fallenMug } from '../fallenMug/fallenMug';
import { waitingMugs } from '../waitingMugs/waitingMugs';

export function addSetPositionXYMethod(cl) {
  Object.defineProperties(cl.prototype, {
    getBoundingRect: {
      value() {
        return this.node.querySelector('img').getBoundingClientRect();
      },
    },

    rectSize: {
      value() {
        const boundRect = this.getBoundingRect();
        return {
          height: boundRect.height / this.position.scaleF,
          width: boundRect.width / this.position.scaleF,
        };
      },
    },

    rectHeight: {
      get() {
        return this.rectSize().height;
      },
    },

    setPositionXY: {
      value(position, centerRelative) {
        const { x, y } = position;
        if (centerRelative) {
          const { width, height } = this.position;
          this.setPosition(
            Object.assign({}, !height && { height: this.rectHeight }, {
              left: x - width / 2,
              bottom: stageDimension.height - y - height / 2,
            }),
          );
          Object.assign(this.position, { x, y: y + height / 2 });
        } else {
          const {
            position: { width },
          } = this;
          this.setPosition(
            Object.assign(
              {},
              x && { left: x - width / 2 },
              y && { bottom: stageDimension.height - y },
            ),
          );
          Object.assign(this.position, position);
        }
      },
    },
  });
}

export function addMugsLifeCyclesMethods(cl) {
  Object.defineProperties(cl.prototype, {
    born: {
      value() {
        this.state.hidden = true;
      },
    },

    appearOnStage: {
      value() {
        this.state.hidden = false;
      },
    },

    dropDown: {
      value() {
        fallenMug.addElement(this);
      },
    },

    carriedToCustomer: {
      value() {
        Object.assign(this.state, { placed: true });
        waitingMugs.addElement(this);
      },
    },
  });
}
