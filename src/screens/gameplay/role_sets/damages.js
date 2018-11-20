/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';

// eslint-disable-next-line
export const damages = new ActorsSet();

damages.name = 'damages';

damages.onAddActorEvent(function ({ target: damage }) {
  window.setTimeout(() => {
    this.deleteElement(damage);
  });
});
