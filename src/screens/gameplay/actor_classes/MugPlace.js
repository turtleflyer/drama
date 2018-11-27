/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import stage from '../../../role_sets/stage/stage';

export default class MugPlace extends Actor {
  constructor(faucet) {
    super('div', faucet.params.mugPlacePosition, stage.scaleF);
    this.faucet = faucet;
    faucet.mugPlace = this;
    this.getAppendedAsChild(faucet);
    this.attachClassName('mugPlaces');
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
