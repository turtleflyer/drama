import stage from '../stage/stage';
import { Actor } from './actors_and_roles';

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
    rectHeight: {
      get() {
        return this.getBoundingRect().height / this.position.scaleF;
      },
    },
    setPositionXY: {
      value(position) {
        const { x, y, width } = position;
        Object.assign(this.position, { x: x || this.position.x, y: y || this.position.y });
        Actor.prototype.setPosition.call(this, {
          left: this.position.x - (width || this.position.width) / 2,
          top: this.position.y,
          width,
        });
      },
    },
  });
}
