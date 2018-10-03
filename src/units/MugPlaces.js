/* eslint-env browser */
import { GameActor, parseDescription, getUnit } from '../gamelibrary';
import { beerExpenses } from '../usingparams';

export default parseDescription({
  MugPlaces: {
    renderDamage(mugPlace, stage) {
      const position = { top: 5, width: 50, height: 50 };
      if (stage) {
        Object.assign(position, { left: -50 });
      } else {
        Object.assign(position, { right: -50 });
      }
      const element = new GameActor(document.createElement('div'), position);
      element.node.textContent = '-$5';
      mugPlace.node.appendChild(element.node);
      element.bornTime = Date.now();
      getUnit('Damages').addElement(element);
    },

    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const place = new GameActor(document.createElement('div'), f.mugPlace);
        place.mugPlace = true;
        place.faucet = f;
        f.mugPlace = place;
        f.node.appendChild(place.node);
        return place;
      });
    },

    mechanism: {
      monitorWasting: {
        type: 'onTick',
        customType: true,
        action({ target }) {
          const {
            faucet: {
              placedMug,
              activeState: { switchOpened, beer },
            },
            startWasting,
          } = target;
          let isWasting = false;
          if (switchOpened && (!placedMug || placedMug.overfillState)) {
            isWasting = true;
          }
          if (isWasting) {
            const currTime = Date.now();
            if (startWasting) {
              const countWastingMoney = Math.floor(
                (((currTime - startWasting) / 1000) * beerExpenses[beer]) / 5,
              );
              if (countWastingMoney > target.countWastingMoney) {
                this.renderDamage(target, countWastingMoney % 2);
                target.countWastingMoney = countWastingMoney;
              }
            } else {
              target.startWasting = currTime;
              target.countWastingMoney = 0;
            }
          } else {
            target.startWasting = null;
          }
        },
      },
    },
  },
});
