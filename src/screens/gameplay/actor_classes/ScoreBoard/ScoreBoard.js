/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { scorePosition } from '../../assets/gameplay_params';
import stage from '../../../../role_sets/stage/stage';
import './styles.css';

export default class ScoreBoard extends Actor {
  constructor() {
    super('div', scorePosition, { scaleF: stage.scaleF, zIndex: 80 });
    this.attachClassName('scoreBoard');
    this.getAppendedAsChild(stage);
  }

  refreshInformation() {
    this.node.textContent = `$${Math.round(stage.state.money)}`;
  }
}