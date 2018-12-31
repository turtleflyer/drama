/* eslint-env browser */
import { ActorsSet, registerActionOfType } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import { tuneGame, stageDimension } from '../../../../stage/gameplay_params';
import './styles.css';
import { totalsOnTable } from '../totalsOnTable/totalsOnTable';
import { removeElementWhenAnimationEnds } from '../../../../libs/helpers_lib';
import { setA } from '../../supersets/setA';

// eslint-disable-next-line
export const fallenMug = new ActorsSet();

fallenMug.name = 'fallenMug';

fallenMug.onAddActorEvent(({ target: mug }) => {
  mug.setZIndex(90);
  mug.attachClassName('fallenMug');
  stage.state.reputation += tuneGame.reputationDecrement;
  if (mug.state.total || mug.state.filled) {
    window.setTimeout(() => {
      totalsOnTable.createNew(false, { x: mug.position.x, y: stageDimension.height - 90 });
    }, 1000);
  }
});

registerActionOfType('animationend', fallenMug, {
  action: removeElementWhenAnimationEnds,
}).start();

setA.addElement(fallenMug);
