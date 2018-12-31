import { ActorsSet } from '../../../../libs/actors_and_roles';
import { onPulseTick } from '../../../../stage/role_classes';
import ScoreBoard from './ScoreBoardClass';
import { startStopRoles } from '../../../../roles_manipulators';
import { setA } from '../../supersets/setA';

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
