/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';

// eslint-disable-next-line
export const fillingGlass = new ActorsSet();

fillingGlass.name = 'fillingGlass';

fillingGlass.onAddActorEvent(({ target: mug }) => {
  mug.state.placed = true;
});
