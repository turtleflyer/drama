/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import stage from '../../../role_sets/stage/stage';

export default class FaucetHandle extends Actor {
  constructor(faucet) {
    super('div', faucet.params.switchPlacePosition, { scaleF: stage.scaleF, zIndex: 70 });
    this.faucet = faucet;
    faucet.switchHandle = this;
    faucet.node.appendChild(this.node);

    /**
     * Debugging purpose
     */
    this.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';
  }
}
