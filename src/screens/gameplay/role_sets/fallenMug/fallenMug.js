/* eslint-env browser */
import { ActorsSet } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { tuneGame } from '../../../../stage/gameplay_params';

// eslint-disable-next-line
export const fallenMug = new ActorsSet();

fallenMug.name = 'fallenMug';

fallenMug.onAddActorEvent(function ({ target: mug }) {
  mug.dropDown();
  stage.state.reputation += tuneGame.reputationDecrement;
  window.setTimeout(() => {
    mug.node.remove();
    this.deleteElement(mug);
  }, 1000);
});
