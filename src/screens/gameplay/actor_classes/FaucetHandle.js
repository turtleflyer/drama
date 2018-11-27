/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import stage from '../../../role_sets/stage/stage';

export default class FaucetHandle extends Actor {
  constructor(faucet) {
    super('div', faucet.params.switchPlacePosition, stage.scaleF);
    this.faucet = faucet;
    faucet.switchHandle = this;
    faucet.node.appendChild(this.node);
    this.attachClassName('faucetHandles');
  }
}
