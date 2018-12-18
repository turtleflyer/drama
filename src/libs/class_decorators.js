import stage from '../stage/stage';
import { stageDimension } from '../stage/gameplay_params';

export function addWhereToPlaceMugMethod(cl, params) {
  cl.prototype.whereToPlaceMug = function () {
    {
      const { x: originX, y: originY } = stage.origin;
      const { scaleF } = this.position;
      const {
        left, top, width, height,
      } = this.node.getBoundingClientRect();
      return {
        x: (left - originX + width / 2) / scaleF,
        y: (top - originY + height * params.mugLine) / scaleF,
      };
    }
  };
}

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
          Object.assign(this.position, { x, y: this.position.bottom });
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
