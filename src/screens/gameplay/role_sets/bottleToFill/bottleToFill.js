import { ActorsSet } from '../../../../libs/actors_and_roles';

// eslint-disable-next-line
export const bottleToFill = new ActorsSet();

bottleToFill.name = 'bottleToFill';

bottleToFill.onAddActorEvent(({ target: bottle }) => {
  bottle.setZIndex(80);
});
