import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import Faucet from '../actor_classes/Faucet/Faucet';
import stage from '../../../role_sets/stage/stage';
import { switchTypes, beerCost } from '../assets/gameplay_params';
import { onPulseTick } from '../../../assets/role_classes';
import { updateMoney } from './scoreBoard';

// eslint-disable-next-line
export const faucets = new ActorsSet();
faucets.getInitializer(function () {
  stage.params.levelParams.faucets.forEach((faucet) => {
    const { model, horizontalPosition } = faucet;
    this.addElement(new Faucet(model, horizontalPosition));
  });
});

faucets.name = 'faucets';

export const SwitchFaucetClass = new RoleClass(Symbol('switchFaucet'));

export const switchFaucetRole = SwitchFaucetClass.registerAction(faucets, {
  action({ target: faucet }) {
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
  },
}).start();

export const countExpenses = onPulseTick.registerAction(faucets, {
  action({ target: faucet }) {
    const currTime = Date.now();
    if (faucet.state.isOpened) {
      if (faucet.state.lastTime) {
        stage.state.money
          -= ((currTime - faucet.state.lastTime) / 1000) * beerCost[faucet.state.beer];
      }
      faucet.state.lastTime = currTime;
      updateMoney.fire();
    } else {
      faucet.state.lastTime = null;
    }
  },
});
