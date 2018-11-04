import { ActorsSet } from '../../../libs/actors_and_roles';
import HookPlace from '../actor_classes/HookPlace';
import customersTable from './customersTable';

const hookPlace = new ActorsSet();
hookPlace.getInitializer(function () {
  this.addElement(new HookPlace(customersTable));
});

export default hookPlace;
