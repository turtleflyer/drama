/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';

export default class MugPlace extends Actor {
  constructor(faucet) {
    super(document.createElement('div'), faucet.params.mugPlacePosition, faucet.position.scaleF);
    this.stage = faucet.stage;
    this.faucet = faucet;
    faucet.mugPlace = this;
    this.getAppendedAsChild(faucet);
    this.attachClassName('mugPlaces');
  }

  whereToPlaceMug() {
    const { x: originX, y: originY } = this.stage.origin;
    const { scaleF } = this.position;
    const {
      left, top, width, height,
    } = this.node.getBoundingClientRect();
    return { x: (left - originX + width / 2) / scaleF, y: (top - originY + height) / scaleF };
  }
}
