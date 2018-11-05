import { ActorsSet } from '../../../libs/actors_and_roles';
import faucets from './faucets';
import MugPlace from '../actor_classes/MugPlace';

const mugPlaces = new ActorsSet();
mugPlaces.getInitializer(function () {
  this.addElements([...faucets].map(faucet => new MugPlace(faucet)));
});

export default mugPlaces;
