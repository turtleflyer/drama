import { ActorsSet } from '../../../libs/actors_and_roles';
import { mugs } from './mugs';
import { dragMug } from '../role_sets/dragMug';
import bar from '../role_sets/bar';
import faucets from '../role_sets/faucets';
import mugPlaces from '../role_sets/mugPlaces';
import customersTable from '../role_sets/customersTable';

export default new ActorsSet([mugs, dragMug, bar, faucets, mugPlaces, customersTable]);
