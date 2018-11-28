/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { scorePosition, gameResultsTypes } from '../../assets/gameplay_params';
import stage from '../../../../role_sets/stage/stage';
import './styles.css';
import { getResultRole } from '../../role_sets/resultOfGame/resultOfGame';

export default class ScoreBoard extends Actor {
  constructor() {
    super('div', scorePosition, { scaleF: stage.scaleF, zIndex: 80 });
    this.attachClassName('scoreBoard');
    this.getAppendedAsChild(stage);
  }

  refreshInformation() {
    const {
      state: { money },
      params: {
        levelParams: { moneyToEarn },
      },
    } = stage;
    if (money <= 0) {
      getResultRole.fire({ result: gameResultsTypes.LOST });
    } else if (money >= moneyToEarn) {
      getResultRole.fire({ result: gameResultsTypes.WON });
    }
    this.node.textContent = `$${Math.round(stage.state.money)}`;
  }
}
