/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import './styles.css';
import { damagesParams } from './damages_params';

export default class Damage extends Actor {
  constructor(faucet, phase) {
    super('div', damagesParams.position[phase], { scaleF: stage.scaleF, zIndex: 72 });
    this.node.textContent = '-$5';
    this.getAppendedAsChild(faucet);
    this.attachClassName('damages');
  }
}
