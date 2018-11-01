import { ActorsSet } from '../../../libs/actors_and_roles';
import faucets from './faucets';
import MugPlace from '../actor_classes/MugPlace';

const mugPlaces = new ActorsSet();
mugPlaces.getInitializer(function () {
  [...faucets].forEach((faucet) => {
    this.addElement(new MugPlace(faucet));
  });
});

export default mugPlaces;
