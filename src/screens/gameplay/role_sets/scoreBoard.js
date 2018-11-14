import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import ScoreBoard from '../actor_classes/ScoreBoard';

// eslint-disable-next-line
export const scoreBoard = new ActorsSet();
scoreBoard.getInitializer(function () {
  const scoreB = new ScoreBoard();
  this.addElement(scoreB);
  scoreB.refreshInformation();
});

scoreBoard.name = 'scoreBoard';

export const updateMoney = new RoleClass(Symbol('updateMoney'))
  .registerAction(scoreBoard, {
    action({ target: scoreB }) {
      scoreB.refreshInformation();
    },
  })
  .start();

/**
 * Chunk of the old code that may occur to be useful
 *
  loanExpenses: {
        type: 'onTick',
        customType: true,
        action({ memory }) {
          const { lastTime } = memory;
          const currTime = Date.now();
          if (lastTime) {
            commonParams.money -= ((currTime - lastTime) / 1000) * commonParams.loanExpenses;
            fireEvent(this.unit, 'updateMoney');
          }
          memory.lastTime = currTime;
        },
      },
 *
 */
