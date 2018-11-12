/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { updateStyle } from '../../../libs/helpers_lib';
import stage from '../../../role_sets/stage/stage';
import { tuneGame } from '../assets/gameplay_params';

// eslint-disable-next-line
export const fallenMug = new ActorsSet();

fallenMug.name = 'fallenMug';

fallenMug.onAddActorEvent(function ({ event: { addedElement: mug } }) {
  updateStyle(mug.node, { transform: 'scale(0.5)' });
  stage.gameState.reputation += tuneGame.reputationDecrement;
  window.setTimeout(() => {
    mug.node.remove();
    this.deleteElement(mug);
  }, 1000);
});
