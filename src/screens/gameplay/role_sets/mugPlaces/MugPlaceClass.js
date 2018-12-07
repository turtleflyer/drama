/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../role_sets/stage/stage';

export default class MugPlace extends Actor {
  constructor(faucet) {
    super('div', faucet.params.mugPlacePosition, { scaleF: stage.scaleF, zIndex: 70 });
    this.faucet = faucet;
    faucet.mugPlace = this;
    this.getAppendedAsChild(faucet);

    /**
     * Debugging purpose
     */
    this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
  }

  whereToPlaceMug() {
    const { x: originX, y: originY } = stage.origin;
    const { scaleF } = this.position;
    const {
      left, top, width, height,
    } = this.node.getBoundingClientRect();
    return { x: (left - originX + width / 2) / scaleF, y: (top - originY + height) / scaleF };
  }
}
