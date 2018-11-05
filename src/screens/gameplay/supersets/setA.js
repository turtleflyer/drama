import { ActorsSet } from '../../../libs/actors_and_roles';
import { mugs } from './mugs';
import { dragMug } from '../role_sets/dragMug';
import bar from '../role_sets/bar';
import faucets from '../role_sets/faucets';
import customersTable from '../role_sets/customersTable';
import { dropPlaces } from './dropPlaces';

export default new ActorsSet([mugs, dragMug, bar, faucets, dropPlaces, customersTable]);
