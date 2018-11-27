/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import stage from '../../../role_sets/stage/stage';
import { damagesParams } from '../assets/gameplay_params';

export default class Damage extends Actor {
  constructor(faucet, phase) {
    super('div', damagesParams.position[phase], { scaleF: stage.scaleF });
    this.node.textContent = '-$5';
    this.getAppendedAsChild(faucet);
    this.attachClassName('damages');
  }
}
