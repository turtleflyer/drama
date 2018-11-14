/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import { scorePosition } from '../assets/gameplay_params';
import stage from '../../../role_sets/stage/stage';

export default class ScoreBoard extends Actor {
  constructor() {
    super(document.createElement('div'), scorePosition, stage.scaleF);
    this.attachClassName('scoreBoard');
    this.getAppendedAsChild(stage);
    const moneyDisplay = new Actor(
      document.createElement('div'),
      scorePosition.moneyDisplayPosition,
      stage.scaleF,
    );
    moneyDisplay.attachClassName('moneyDisplay');
    moneyDisplay.getAppendedAsChild(this);
    this.linkActor(moneyDisplay);
    this.moneyDisplay = moneyDisplay;
  }

  refreshInformation() {
    this.moneyDisplay.node.textContent = `$${Math.round(stage.state.money)}`;
  }
}
