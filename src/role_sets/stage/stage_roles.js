/* eslint-env browser */
import stage from './stage';
import { draggingMug } from '../../screens/gameplay/role_sets/dragMug';
import { setA } from '../../screens/gameplay/supersets/setA';
import { pulseTimeout } from '../../screens/gameplay/assets/gameplay_params';
import { registerActionOfType } from '../../libs/actors_and_roles';
import { pulse, onPulseTick } from '../../assets/role_classes';

export const sendPulse = pulse.registerAction(stage, {
  action() {
    onPulseTick.fire(setA);
    window.setTimeout(() => {
      this.fire();
    }, pulseTimeout);
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
