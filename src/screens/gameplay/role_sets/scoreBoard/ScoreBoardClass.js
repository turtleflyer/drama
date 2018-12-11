/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import './styles.css';
import { gameResultsTypes } from '../resultOfGame/resultOfGame_params';
import { scorePosition } from './scoreBoard_params';
import { resultOfGame } from '../resultOfGame/resultOfGame';

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
      resultOfGame.getResult(gameResultsTypes.LOST);
    } else if (money >= moneyToEarn) {
      resultOfGame.getResult(gameResultsTypes.WON);
    }
    this.node.textContent = `$${Math.round(stage.state.money)}`;
  }
}
