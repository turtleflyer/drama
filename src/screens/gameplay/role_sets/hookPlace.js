import { ActorsSet } from '../../../libs/actors_and_roles';
import HookPlace from '../actor_classes/HookPlace';
import { customersTable } from './customersTable';
import stage from '../../../role_sets/stage/stage';

// eslint-disable-next-line
export const hookPlace = new ActorsSet();
hookPlace.getInitializer(function () {
  this.addElement(new HookPlace(stage, customersTable));
});

hookPlace.name = 'hookPlace';
