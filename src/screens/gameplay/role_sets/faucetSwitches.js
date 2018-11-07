import { ActorsSet } from '../../../libs/actors_and_roles';
import { faucets } from './faucets';
import FaucetSwitch from '../actor_classes/FaucetSwitch';

// eslint-disable-next-line
export const faucetSwitches = new ActorsSet();
faucetSwitches.getInitializer(function () {
  this.addElements([...faucets].map(faucet => new FaucetSwitch(faucet)));
});

faucetSwitches.name = 'faucetSwitches';
