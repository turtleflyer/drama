import { ActorsSet, registerActionOfType } from '../../../libs/actors_and_roles';
import { faucets } from './faucets';
import FaucetHandle from '../actor_classes/FaucetHandle';

export const faucetHandles = new ActorsSet();
faucetHandles.getInitializer(function () {
  this.addElements([...faucets].map(faucet => new FaucetHandle(faucet)));
});

faucetHandles.name = 'faucetHandles';

export const switchFaucetStateRole = registerActionOfType('click', faucetHandles, {
  action({ target: handle, event }) {
    event.preventDefault();
    event.stopPropagation();
    const { faucet } = handle;
    faucets.switchFaucet(faucet);
  },
}).start();
