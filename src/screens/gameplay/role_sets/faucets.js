import { ActorsSet } from '../../../libs/actors_and_roles';
import Faucet from '../actor_classes/Faucet/Faucet';
import stage from '../../../role_sets/stage/stage';

const faucets = new ActorsSet();
faucets.getInitializer(function () {
  stage.levelParams.faucets.forEach((faucet) => {
    const { model, horizontalPosition } = faucet;
    this.addElement(new Faucet(model, horizontalPosition));
  });
});

faucets.name = 'faucets';

export default faucets;
