import { ActorsSet } from '../../../libs/actors_and_roles';
import { mugs } from './mugs';
import { dragMug } from '../role_sets/dragMug';
import { bar } from '../role_sets/bar';
import { faucets } from '../role_sets/faucets';
import { customersTable } from '../role_sets/customersTable';
import { dropPlaces } from './dropPlaces';
import { fallenMug } from '../role_sets/fallenMug';

// eslint-disable-next-line
export const setA = new ActorsSet([
  mugs,
  dragMug,
  fallenMug,
  bar,
  faucets,
  dropPlaces,
  customersTable,
]);

setA.name = 'setA';
