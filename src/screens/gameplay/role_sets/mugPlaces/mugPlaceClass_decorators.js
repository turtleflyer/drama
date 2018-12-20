import stage from '../../../../stage/stage';

// eslint-disable-next-line
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
