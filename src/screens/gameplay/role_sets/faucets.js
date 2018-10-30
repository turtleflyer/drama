import { ActorsSet } from '../../../libs/actors_and_roles';
import Faucet from '../actor_classes/Faucet/Faucet';

const faucets = new ActorsSet();
faucets.getInitializer(function () {
  this.addElement(new Faucet(0));
});

export default faucets;
