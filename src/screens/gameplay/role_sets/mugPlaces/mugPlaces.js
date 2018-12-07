import { ActorsSet } from '../../../../libs/actors_and_roles';
import { faucets } from '../faucets/faucets';
import MugPlace from './MugPlaceClass';

// eslint-disable-next-line
export const mugPlaces = new ActorsSet();
mugPlaces.getInitializer(function () {
  this.addElements([...faucets].map(faucet => new MugPlace(faucet)));
});

mugPlaces.name = 'mugPlaces';
