import { faucets } from '../faucets/faucets';
import FaucetHandle from './FaucetHandleClass';
import { registerActionOfType, ActorsSet } from '../../../../libs/actors_and_roles';
import { setA } from '../../supersets/setA';

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

setA.addElement(faucetHandles);
