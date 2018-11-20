import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import ScoreBoard from '../actor_classes/ScoreBoard';
import { onPulseTick } from '../../../assets/role_classes';
import stage from '../../../role_sets/stage/stage';

// eslint-disable-next-line
export const scoreBoard = new ActorsSet();
scoreBoard.getInitializer(function () {
  const scoreB = new ScoreBoard();
  this.addElement(scoreB);
  scoreB.refreshInformation();
});

scoreBoard.name = 'scoreBoard';

let lastTime;

export const updateMoneyRole = onPulseTick.registerAction(scoreBoard, {
  action({ target: scoreB }) {
    const currTime = Date.now();
    if (lastTime) {
      stage.state.money -= ((currTime - lastTime) / 1000) * stage.params.levelParams.loanExpenses;
      scoreB.refreshInformation();
    }
    lastTime = currTime;
  },
});
