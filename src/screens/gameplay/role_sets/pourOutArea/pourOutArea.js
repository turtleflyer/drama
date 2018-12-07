/* eslint-env browser */
import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import { pourOutAreaParams } from './pourOutArea_params';
import stage from '../../../../role_sets/stage/stage';
import './styles.css';

const emptyingPhaseStyle = 'pourOutArea--emptying';
const revertingPhaseStyle = 'pourOutArea--reverting';

const area = new Actor('div', pourOutAreaParams.position, {
  scaleF: stage.scaleF,
  zIndex: 30,
});

/**
 * Debugging purpose
 */
area.node.style['background-color'] = 'rgba(255, 255, 255, 0.2)';

// eslint-disable-next-line
export const pourOutArea = new ActorsSet();

pourOutArea.name = 'pourOutArea';

pourOutArea.getInitializer(function () {
  this.addElement(area);
  area.getAppendedAsChild(stage);
});

pourOutArea.emptyMug = function (mug) {
  mug.state.beers = null;
  mug.state.total = null;
  mug.state.overfilled = null;
  mug.state.fillingPhase = null;
  mug.node.classList.add(emptyingPhaseStyle);

  function animatePouringStart() {
    if (mug.node.classList.contains(revertingPhaseStyle)) {
      mug.updateFillRepresentation();
    }
  }

  function animatePouringEnd() {
    if (mug.node.classList.contains(emptyingPhaseStyle)) {
      mug.node.classList.remove(emptyingPhaseStyle);
      mug.node.classList.add(revertingPhaseStyle);
    } else {
      mug.node.classList.remove(revertingPhaseStyle);
      mug.node.removeEventListener('animationstart', animatePouringStart);
      mug.node.removeEventListener('animationend', animatePouringEnd);
    }
  }

  mug.node.addEventListener('animationstart', animatePouringStart);
  mug.node.addEventListener('animationend', animatePouringEnd);
};
