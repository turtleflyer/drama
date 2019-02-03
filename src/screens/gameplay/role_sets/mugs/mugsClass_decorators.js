import { stageDimension } from '../../../../stage/gameplay_params';
import { fallenMug } from '../fallenMug/fallenMug';
import { waitingMugs } from '../waitingMugs/waitingMugs';
import stage from '../../../../stage/stage';
import { Actor } from '../../../../libs/actors_and_roles';

export function addSetPositionXYMethod(cl) {
  Object.defineProperties(cl.prototype, {
    getBoundingRect: {
      value() {
        return this.node.querySelector('img').getBoundingClientRect();
      },
    },

    rectSize: {
      value() {
        const {
          params,
          position: { scaleF },
        } = this;
        if (!params.rectSize) {
          const boundRect = this.getBoundingRect();
          params.rectSize = {
            height: boundRect.height / scaleF,
            width: boundRect.width / scaleF,
          };
        }
        return params.rectSize;
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

    showMoneyHint: {
      value() {
        const { imageElement } = this;
        imageElement.onload = () => {
          const { width: mugWidth, height: mugHeight } = this.rectSize();
          const hint = new Actor(
            'div',
            { width: mugWidth, bottom: mugHeight + 5, height: 15 },
            { scaleF: stage.scaleF, zIndex: 50 },
          ).attachClassName('mug--money-hint');
          hint.node.innerText = `\$${Math.round(this.params.profit)}`;
          hint.getAppendedAsChild(this);
          this.moneyHint = hint;
          imageElement.onload = null;
        };
      },
    },
  });
}

export function addMugsLifeCyclesMethods(cl) {
  Object.defineProperties(cl.prototype, {
    born: {
      value() {
        this.state.hidden = true;
        this.showMoneyHint();
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
        this.state.place = true;
        waitingMugs.addElement(this);
      },
    },
  });
}
