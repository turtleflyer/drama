/* eslint-env browser */
import stage, { defineScaleF } from './stage';
import { dragMug, followMouseRole, stopDragRole } from '../../screens/gameplay/role_sets/dragMug';
import { setA, resizeEverythingRole } from '../../screens/gameplay/supersets/setA';
import { registerActionOfType } from '../../libs/actors_and_roles';
import { onPulseTick, onResize } from '../../assets/role_classes';
import { fallenMug } from '../../screens/gameplay/role_sets/fallenMug';
import { setD } from '../../debug/setD';
import { stopBubbling } from '../../libs/eventswork';
import { debugPulse } from '../../debug/fps';
import Worker from '../../webworkers/pulse.worker';
import { defaultFontSize } from '../../screens/gameplay/assets/gameplay_params';

const pulseWorker = new Worker();

pulseWorker.onmessage = (e) => {
  if (!stage.state.paused) {
    onPulseTick.fireAndWaitWhenExhausted(setA, stopBubbling({}))(() => {
      /**
       * Display debugging information
       */
      onPulseTick.fire(setD, stopBubbling({}));
      if (e.data) {
        debugPulse.info = e.data;
      }
      /**
       *
       */
    });
  }
};

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

const resizeStageRole = onResize
  .registerAction(stage, {
    action({ target, event: { scaleF } }) {
      target.refreshScaleF(scaleF);
      stage.stageNode.style['font-size'] = `${defaultFontSize * scaleF}px`;
    },
  })
  .start();

window.addEventListener('resize', () => {
  const scaleF = defineScaleF();
  resizeEverythingRole.fire({ scaleF });
  resizeStageRole.fire({ scaleF });
});
