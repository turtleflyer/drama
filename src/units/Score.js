/* eslint-env browser */
import { parseDescription, GameActor, commonParams } from '../gamelibrary';
import { fireEvent } from '../eventswork';

const barPosition = {
  right: 10,
  top: 10,
  width: 100,
  height: 50,
};

let scoreBar;

export default parseDescription({
  Score: {
    nested() {
      scoreBar = new GameActor(document.createElement('div'), barPosition);
      commonParams.origin.appendChild(scoreBar.node);
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
          target.moneyDisplay.textContent = `$${Math.round(commonParams.money / 5) * 5}`;
        },
        fireImmediately: true,
      },
    },
  },
});
