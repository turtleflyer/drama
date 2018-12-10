/* eslint-env browser */
import { ActorsSet, registerActionOfType } from '../../../../libs/actors_and_roles';
import './styles.css';
import { dragMug } from '../dragMug/dragMug';

const emptyingPhaseStyle = 'pourOutArea--emptying';
const revertingPhaseStyle = 'pourOutArea--reverting';
let animationStage;

// eslint-disable-next-line
export const pouringMug = new ActorsSet();

pouringMug.name = 'pouringMug';

pouringMug.onAddActorEvent(({ target: mug }) => {
  mug.node.classList.add(emptyingPhaseStyle);
  animationStage = 0;
  mug.state.pouring = true;
});

registerActionOfType('animationend', pouringMug, {
  action({ target: mug }) {
    switch (animationStage) {
      case 0:
        mug.node.classList.remove(emptyingPhaseStyle);
        mug.state.beers = null;
        mug.state.total = null;
        mug.state.overfilled = null;
        mug.state.fillingPhase = null;
        mug.updateFillRepresentation();
        mug.node.classList.add(revertingPhaseStyle);
        animationStage = 1;
        break;

      case 1:
        mug.node.classList.remove(revertingPhaseStyle);
        mug.state.pouring = false;
        dragMug.addElement(mug);
        break;

      default:
        break;
    }
  },
}).start();
