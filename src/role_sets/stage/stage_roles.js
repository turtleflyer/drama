/* eslint-env browser */
import stage from './stage';
import { dragMug, followMouseRole, stopDragRole } from '../../screens/gameplay/role_sets/dragMug';
import { setA } from '../../screens/gameplay/supersets/setA';
import { pulseTimeout } from '../../screens/gameplay/assets/gameplay_params';
import { registerActionOfType, RoleClass } from '../../libs/actors_and_roles';
import { onPulseTick } from '../../assets/role_classes';
import { fallenMug } from '../../screens/gameplay/role_sets/fallenMug';
import { setD } from '../../debug/setD';
import { stopBubbling } from '../../libs/eventswork';

export const sendPulseRole = new RoleClass(Symbol('pulse'))
  .registerAction(stage, {
    action() {
      onPulseTick.fireAndWaitWhenExhausted(setA, stopBubbling({}))(() => {
        /**
         * Display debugging information
         */
        onPulseTick.fire(setD, stopBubbling({}));
        /**
         *
         */
      });
      window.setTimeout(() => {
        this.roleClass.fire([...stage][0]);
      }, pulseTimeout);
    },
  })
  .start()
  .fire();

// Prevents default behaviors in Firefox browser
registerActionOfType('dragstart', stage, {
  action({ event }) {
    event.preventDefault();
  },
}).start();

export const dragRole = registerActionOfType('mousemove', stage, {
  action({ event }) {
    event.preventDefault();
    const { clientX, clientY } = event;

    const { scaleF } = stage;
    followMouseRole.fire({
      x: (clientX - stage.origin.x) / scaleF,
      y: (clientY - stage.origin.y) / scaleF,
    });
  },
});

export const dropMugRole = registerActionOfType('mouseleave', stage, {
  action() {
    if (dragMug.size === 1) {
      fallenMug.addElement([...dragMug][0]);
    }
  },
});

export const stopCarryingRole = registerActionOfType('mouseup', stage, {
  action() {
    stopDragRole.fire();
  },
});
