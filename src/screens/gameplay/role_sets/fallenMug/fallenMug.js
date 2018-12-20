/* eslint-env browser */
import { ActorsSet, registerActionOfType } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { tuneGame } from '../../../../stage/gameplay_params';
import './styles.css';

// eslint-disable-next-line
export const fallenMug = new ActorsSet();

fallenMug.name = 'fallenMug';

fallenMug.onAddActorEvent(({ target: mug }) => {
  mug.setZIndex(90);
  mug.attachClassName('fallenMug');
  stage.state.reputation += tuneGame.reputationDecrement;
});

registerActionOfType('animationend', fallenMug, {
  action({ roleSet, target: mug }) {
    mug.remove();
    roleSet.deleteElement(mug);
  },
}).start();
