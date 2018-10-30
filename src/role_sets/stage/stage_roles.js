/* eslint-env browser */
import mousemove from '../../role_classes/mousemove';
import stage from './stage';
import { draggingMug } from '../../screens/gameplay/role_sets/dragMug';
import pulse from '../../role_classes/pulse';
import onPulseTick from '../../role_classes/onPulseTick';
import { setA } from '../../screens/gameplay/supersets/setA';
import { pulseTimeout } from '../../screens/gameplay/assets/gameplay_params';

export const sendPulse = pulse.registerAction(stage, {
  action() {
    onPulseTick.fire(setA);
    window.setTimeout(() => {
      this.fire();
    }, pulseTimeout);
  },
});

export const drag = mousemove.registerAction(stage, {
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
