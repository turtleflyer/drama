import { ActorsSet } from '../../../libs/actors_and_roles';
import HookPlace from '../actor_classes/HookPlace';

// eslint-disable-next-line
export const hookPlace = new ActorsSet();
hookPlace.getInitializer(function () {
  this.addElement(new HookPlace());
});

hookPlace.name = 'hookPlace';
