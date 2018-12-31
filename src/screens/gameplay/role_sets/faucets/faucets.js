import { ActorsSet } from '../../../../libs/actors_and_roles';
import Faucet from './FaucetClass';
import stage from '../../../../stage/stage';
import { onPulseTick } from '../../../../stage/role_classes';
import { damages } from '../damages/damages';
import { beerCost } from '../../../../stage/gameplay_params';
import { switchTypes } from './faucets_params';
import { damagesParams } from '../damages/damages_params';
import { startStopRoles } from '../../../../roles_manipulators';
import { setA } from '../../supersets/setA';

// eslint-disable-next-line
export const faucets = new ActorsSet();
faucets.getInitializer(function () {
  stage.params.levelParams.faucets.forEach((faucet) => {
    const { model, horizontalPosition } = faucet;
    this.addElement(new Faucet(model, horizontalPosition));
  });
});

faucets.name = 'faucets';

faucets.switchFaucet = function (faucet) {
  const { switchType, beerTypes } = faucet.params;
  const { state } = faucet;
  if (switchType !== switchTypes.BROKEN) {
    state.phase = 1 - state.phase;
    faucet.switchState();
    if (switchType === switchTypes.DUAL) {
      state.beer = beerTypes[state.phase];
    } else if (switchType === switchTypes.NORMAL) {
      state.isOpened = !state.isOpened;
      faucet.runJet();
    }
  }
};

export const countExpensesRole = onPulseTick.registerAction(faucets, {
  action({ target: faucet }) {
    const currTime = Date.now();
    if (faucet.state.isOpened) {
      if (faucet.state.lastTime) {
        stage.state.money
          -= ((currTime - faucet.state.lastTime) / 1000) * beerCost[faucet.state.beer];
      }
      faucet.state.lastTime = currTime;
      let isWasting = false;
      const { placedMug } = faucet.state;
      if (!placedMug || placedMug.state.overfilled) {
        isWasting = true;
      }
      if (isWasting) {
        const { lastRenderedDamage } = faucet.state;
        if (lastRenderedDamage) {
          // prettier-ignore
          const wastingMoney = ((currTime - lastRenderedDamage.created) / 1000)
            * beerCost[faucet.state.beer];
          if (wastingMoney > damagesParams.quant) {
            damages.addDamage(faucet, lastRenderedDamage.phase);
            // this.renderDamage(target, countWastingMoney % 2);
            faucet.state.lastRenderedDamage = {
              phase: 1 - lastRenderedDamage.phase,
              created: currTime,
            };
          }
        } else {
          faucet.state.lastRenderedDamage = { phase: 0, created: currTime };
        }
      } else {
        faucet.state.lastRenderedDamage = null;
      }
    } else {
      faucet.state.lastTime = null;
      faucet.state.lastRenderedDamage = null;
    }
  },
});

startStopRoles.addElement(countExpensesRole);
setA.addElement(faucets);
