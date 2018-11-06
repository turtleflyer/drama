/* eslint-env browser */
import stage from './stage';
import { draggingMug, dragMug, stopDrag } from '../../screens/gameplay/role_sets/dragMug';
import setA from '../../screens/gameplay/supersets/setA';
import { pulseTimeout } from '../../screens/gameplay/assets/gameplay_params';
import { registerActionOfType } from '../../libs/actors_and_roles';
import { pulse, onPulseTick } from '../../assets/role_classes';
import fallenMug from '../../screens/gameplay/role_sets/fallenMug';

export const sendPulse = pulse.registerAction(stage, {
  action() {
    onPulseTick.fire(setA);
    window.setTimeout(() => {
      this.fire();
    }, pulseTimeout);
  },
});

registerActionOfType('dragstart', stage, {
  action({ event }) {
    event.preventDefault();
  },
});

export const drag = registerActionOfType('mousemove', stage, {
  action({ event }) {
    event.preventDefault();
    const { clientX, clientY } = event;

    const { scaleF } = stage;
    draggingMug.fire({
      x: (clientX - stage.origin.x) / scaleF,
      y: (clientY - stage.origin.y) / scaleF,
    });
  },
});

export const fallDownMug = registerActionOfType('mouseleave', stage, {
  action() {
    if (dragMug.size === 1) {
      fallenMug.addElement([...dragMug][0]);
    }
  },
});

export const stopDnD = registerActionOfType('mouseup', stage, {
  action() {
    stopDrag.fire();
  },
});
