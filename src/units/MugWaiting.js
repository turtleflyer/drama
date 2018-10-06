/* eslint-env browser */
import { parseDescription, commonParams, getUnit } from '../gamelibrary';
import {
  howLongToWait,
  possibleCustomerReactions,
  beerExpenses,
  mugsVolumes,
  tuneGame,
} from '../usingparams';
import { fireEvent } from '../eventswork';

function countProfit({ load, beerType }) {
  const { drunkFactor } = commonParams;
  const { reputationDecrement, reputationIncrement, drunkFactorIncrement } = tuneGame;
  const allBeer = Object.keys(load).reduce((w, b) => w + load[b], 0);
  const targetBeer = load[beerType];
  switch (true) {
    case allBeer < 0.9 / drunkFactor:
      commonParams.reputation += reputationDecrement;
      return { money: 0, reaction: possibleCustomerReactions.TOO_FEW };

    case targetBeer / allBeer < 0.9 / drunkFactor:
      commonParams.reputation += reputationDecrement;
      return { money: 0, reaction: possibleCustomerReactions.WRONG_BEER };

    default:
      commonParams.drunkFactor += drunkFactorIncrement;
      commonParams.reputation += reputationIncrement;
      return {
        money: allBeer * mugsVolumes[beerType] * beerExpenses[beerType] * commonParams.margin,
        reaction: possibleCustomerReactions.OK,
      };
  }
}

export default parseDescription({
  MugWaiting: {
    mechanism: {
      filling: {
        type: 'onTick',
        customType: true,
        action({ target }) {
          if (target) {
            const currTime = Date.now();
            const { waitingSince } = target;
            if (!waitingSince) {
              target.waitingSince = currTime;
            } else if (currTime - waitingSince >= howLongToWait) {
              this.unit.delete(target);
              const { money, reaction } = countProfit(target);
              commonParams.money += money;
              fireEvent(getUnit('Score'), 'updateMoney');
              target.node.remove();
            }
          }
        },
      },
    },
  },
});
