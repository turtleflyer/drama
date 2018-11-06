/* eslint-env browser */
import { ActorsSet } from '../../../libs/actors_and_roles';
import { updateStyle } from '../../../libs/helpers_lib';
import stage from '../../../role_sets/stage/stage';
import { tuneGame } from '../assets/gameplay_params';

const fallenMug = new ActorsSet();

fallenMug.name = 'fallenMug';

fallenMug.onAddActorEvent(function ({ target }) {
  updateStyle(target.node, { transform: 'scale(0.5)' });
  stage.gameState.reputation += tuneGame.reputationDecrement;
  window.setTimeout(() => {
    target.node.remove();
    this.deleteElement(target);
  }, 1000);
});

export default fallenMug;
