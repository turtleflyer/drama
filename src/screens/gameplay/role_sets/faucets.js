import { ActorsSet, RoleClass } from '../../../libs/actors_and_roles';
import Faucet from '../actor_classes/Faucet/Faucet';
import { stage } from '../../../role_sets/stage/stage';
import { switchTypes } from '../assets/gameplay_params';

// eslint-disable-next-line
export const faucets = new ActorsSet();
faucets.getInitializer(function () {
  stage.levelParams.faucets.forEach((faucet) => {
    const { model, horizontalPosition } = faucet;
    this.addElement(new Faucet(model, horizontalPosition));
  });
});

faucets.name = 'faucets';

export const SwitchFaucetClass = new RoleClass(Symbol('switchFaucet'));

export const switchFaucetRole = SwitchFaucetClass.registerAction(faucets, {
  action({ target }) {
    const {
      activeState, switchType, beerTypes,
    } = target;
    if (switchType !== switchTypes.BROKEN) {
      activeState.phase = 1 - activeState.phase;
      target.switchState();
      if (switchType === switchTypes.DUAL) {
        activeState.beer = beerTypes[activeState.phase];
      } else if (switchType === switchTypes.NORMAL) {
        activeState.isOpened = !activeState.isOpened;
        target.runJet();
      }
    }
  },
}).start();
