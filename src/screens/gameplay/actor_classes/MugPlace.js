/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import { stage } from '../../../role_sets/stage/stage';

export default class MugPlace extends Actor {
  constructor(faucet) {
    super(document.createElement('div'), faucet.mugPlacePosition);
    // this.mugPlace = true;
    this.faucet = faucet;
    faucet.mugPlace = this;
    faucet.node.appendChild(this.node);
    this.attachClassName('mugPlaces');
  }

  get position() {
    const { x: originX, y: originY } = stage.origin;
    const { scaleF } = stage;
    const {
      left, top, width, height,
    } = this.node.getBoundingClientRect();
    return { x: (left - originX + width / 2) / scaleF, y: (top - originY + height) / scaleF };
  }
}
