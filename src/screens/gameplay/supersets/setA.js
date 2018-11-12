import { ActorsSet } from '../../../libs/actors_and_roles';
import { mugs } from './mugs';
import { dragMug } from '../role_sets/dragMug';
import { faucets } from '../role_sets/faucets';
import { customersTable } from '../role_sets/customersTable';
import { dropPlaces } from './dropPlaces';
import { fallenMug } from '../role_sets/fallenMug';
import { faucetHandles } from '../role_sets/faucetHandles';
import { waitingMugs } from '../role_sets/waitingMugs';
import { bar } from '../role_sets/bar';

// eslint-disable-next-line
export const setA = new ActorsSet([
  bar,
  mugs,
  dragMug,
  fallenMug,
  faucets,
  faucetHandles,
  dropPlaces,
  customersTable,
  waitingMugs,
]);

setA.name = 'setA';
