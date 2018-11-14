/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import { scorePosition } from '../assets/gameplay_params';

export default class ScoreBoard extends Actor {
  constructor(stage) {
    super(document.createElement('div'), scorePosition, stage.scaleF);
    this.attachClassName('scoreBoard');
    this.getAppendedAsChild(stage);
    const moneyDisplay = new Actor(
      document.createElement('div'),
      scorePosition.moneyDisplayPosition,
      stage.scaleF,
    );
    this.stage = stage;
    moneyDisplay.attachClassName('moneyDisplay');
    moneyDisplay.getAppendedAsChild(this);
    this.linkActor(moneyDisplay);
    this.moneyDisplay = moneyDisplay;
  }

  refreshInformation() {
    this.moneyDisplay.node.textContent = `$${Math.round(this.stage.state.money)}`;
  }
}
