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
          commonParams.mugsSpeed = -50;
          commonParams.money = 1000;
          break;

        default:
          break;
      }
      this.startChain();
    },

    nested() {
      const { left, top } = commonParams.scene.getBoundingClientRect();
      this.position = { x: left, y: top };
      const { sceneWidth, sceneHeight } = commonParams;
      sceneTarget = new GameActor(commonParams.scene, {
        width: sceneWidth,
        height: sceneHeight,
      });
      return [sceneTarget];
    },

    mechanism: {
      tickAnimation: {
        type: 'tickAnimation',
        regAsCustom: true,
        action() {
          fireEvent(getUnit('AllUnits'), 'onTick');
          window.setTimeout(() => {
            fireEvent(this.unit, 'tickAnimation');
          }, commonParams.tickTimeout);
        },
        fireImmediately: true,
      },

      dragND: {
        type: 'mousemove',
        action({ target, event }) {
          event.preventDefault();
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
        action() {
          fireEvent(getUnit('DragMug'), 'stopDrag');
        },
      },

      preventDefaultDnD: {
        type: 'dragstart',
        action({ event }) {
          event.preventDefault();
        },
      },
    },
  },
});
