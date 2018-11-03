/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';

export default class MugPlace extends Actor {
  constructor(faucet) {
    super(document.createElement('div'), faucet.mugPlacePosition);
    // this.mugPlace = true;
    this.faucet = faucet;
    faucet.mugPlace = this;
    faucet.node.appendChild(this.node);
    this.attachClassName('mugPlaces');
  }
}
