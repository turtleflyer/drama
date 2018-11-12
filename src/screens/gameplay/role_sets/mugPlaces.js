import { ActorsSet } from '../../../libs/actors_and_roles';
import { faucets } from './faucets';
import MugPlace from '../actor_classes/MugPlace';
import stage from '../../../role_sets/stage/stage';

// eslint-disable-next-line
export const mugPlaces = new ActorsSet();
mugPlaces.getInitializer(function () {
  this.addElements([...faucets].map(faucet => new MugPlace(stage, faucet)));
});

mugPlaces.name = 'mugPlaces';
