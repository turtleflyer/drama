import { ActorsSet, Actor } from '../../../../libs/actors_and_roles';
import { onPulseTick } from '../../../../stage/role_classes';
import { startStopRoles } from '../../../../roles_manipulators';
import { setA } from '../../supersets/setA';
import stage from '../../../../stage/stage';
import { scoreBoardParams } from './scoreBoard_params';
import { resultOfGame } from '../resultOfGame/resultOfGame';
import { gameResultsTypes } from '../resultOfGame/resultOfGame_params';
import './styles.css';

class ScoreBoard extends Actor {
  constructor() {
    super('div', scoreBoardParams.position, { scaleF: stage.scaleF, zIndex: 80 });
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

// eslint-disable-next-line
export const scoreBoard = new ActorsSet();
scoreBoard.getInitializer(function () {
  const scoreB = new ScoreBoard();
  this.addElement(scoreB);
  scoreB.refreshInformation();
});

scoreBoard.name = 'scoreBoard';

export const updateMoneyRole = onPulseTick.registerAction(scoreBoard, {
  action({ target: scoreB }) {
    scoreB.refreshInformation();
  },
});

startStopRoles.addElement(updateMoneyRole);
setA.addElement(scoreBoard);
