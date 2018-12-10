/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';

// eslint-disable-next-line
export const dragMug = new ActorsSet();

dragMug.name = 'dragMug';

dragMug.onAddActorEvent(({ target: mug }) => {
  mug.goDrug();
});
