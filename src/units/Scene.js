/* eslint-env browser */
import {
  commonParams, getUnit, GameActor, parseDescription,
} from '../gamelibrary';
import { fireEvent } from '../eventswork';

let sceneTarget;

export default parseDescription({
  Scene: {
    initialize() {
      switch (commonParams.level) {
        case 0:
          commonParams.mugSpeed = -50;
          break;

        default:
          break;
      }
      this.startChain();
    },

    nested() {
      const { left, top } = commonParams.origin.getBoundingClientRect();
      this.position = { x: left, y: top };
      const { sceneWidth, sceneHeight } = commonParams;
      sceneTarget = new GameActor(commonParams.origin, {
        width: sceneWidth,
        height: sceneHeight,
      });
      return [sceneTarget];
    },

    mechanism: {
      dragND: {
        type: 'mousemove',
        action({ target, event }) {
          event.preventDefault();
          event.stopPropagation();
          const { clientX, clientY } = event;
          const { scaleFactor } = target;
          fireEvent(getUnit('DragMug'), 'followMouse', {
            x: (clientX - this.position.x) / scaleFactor,
            y: (clientY - this.position.y) / scaleFactor,
          });
        },
      },

      dropMug: {
        type: 'mouseleave',
        action() {
          const DragMug = getUnit('DragMug');
          if (DragMug.size === 1) {
            const FallenMug = getUnit('FallenMug');
            FallenMug.addElement([...DragMug][0]);
            fireEvent(FallenMug, 'fallDown');
          }
        },
      },

      stopDnD: {
        type: 'mouseup',
        action({ event }) {
          event.stopPropagation();
          fireEvent(getUnit('DragMug'), 'stopDrag');
        },
      },
    },
  },

  AllUnits: {
    nested: () => [
      getUnit('Scene'),
      getUnit('MugsOnLine'),
      getUnit('DragMug'),
      getUnit('FallenMug'),
      getUnit('Bar'),
      getUnit('Faucets'),
      getUnit('FaucetSwitches'),
      getUnit('MugPlaces'),
      getUnit('MugFilling'),
    ],

    mechanism: {
      stop: {
        type: 'stop',
        customType: true,
        action({ unit, target }) {
          if (unit !== this.unit) {
            unit.description.toTerminate = true;
            if (target !== sceneTarget) {
              target.node.remove();
              unit.clear();
            }
          }
          setTimeout(() => {
            this.toTerminate = true;
          }, 500);
        },
      },
    },
  },
});
