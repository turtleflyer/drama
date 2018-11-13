/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';

export default class FaucetHandle extends Actor {
  constructor(faucet) {
    super(document.createElement('div'), faucet.params.switchPlacePosition, faucet.position.scaleF);
    this.faucet = faucet;
    faucet.switchHandle = this;
    faucet.node.appendChild(this.node);
    this.attachClassName('faucetHandles');
  }
}
