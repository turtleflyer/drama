import { ActorsSet, registerActionOfType } from '../../../libs/actors_and_roles';
import { faucets, SwitchFaucetClass } from './faucets';
import FaucetHandle from '../actor_classes/FaucetHandle';

export const faucetHandles = new ActorsSet();
faucetHandles.getInitializer(function () {
  this.addElements([...faucets].map(faucet => new FaucetHandle(faucet)));
});

faucetHandles.name = 'faucetHandles';

export const switchFaucetStateRole = registerActionOfType('click', faucetHandles, {
  action({ target, event }) {
    event.preventDefault();
    event.stopPropagation();
    const { faucet } = target;
    SwitchFaucetClass.fire(faucet);
  },
}).start();
