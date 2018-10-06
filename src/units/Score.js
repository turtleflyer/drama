/* eslint-env browser */
import { parseDescription, GameActor, commonParams } from '../gamelibrary';
import { scorePosition } from '../usingparams';
import { fireEvent } from '../eventswork';

let scoreBar;

export default parseDescription({
  Score: {
    nested() {
      scoreBar = new GameActor(document.createElement('div'), scorePosition);
      commonParams.scene.appendChild(scoreBar.node);
      const moneyDisplay = new GameActor(document.createElement('div'), {
        top: 3,
        left: 3,
        right: 3,
        bottom: 27,
      });
      scoreBar.node.appendChild(moneyDisplay.node);
      moneyDisplay.node.id = 'moneyDisplay';
      scoreBar.linkActor(moneyDisplay);
      scoreBar.moneyDisplay = moneyDisplay.node;
      return [scoreBar];
    },

    mechanism: {
      updateMoney: {
        type: 'updateMoney',
        customType: true,
        action({ target }) {
          target.moneyDisplay.textContent = `$${Math.round(commonParams.money)}`;
        },
        fireImmediately: true,
      },

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
    },
  },
});
