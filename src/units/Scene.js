/* eslint-env browser */
import {
  commonParams, getUnit, GameActor, parseDescription,
} from '../gamelibrary';
import { fireEvent } from '../eventswork';
import { initState, sceneDimension } from '../usingparams';

export default parseDescription({
  Scene: {
    initialize() {
      Object.assign(commonParams, initState);
      switch (commonParams.level) {
        case 0:
          Object.assign(commonParams, {
            mugsSpeed: -75,
            money: 100,
            loanExpenses: 0,
            initMugDensity: 4,
          });
          break;

        default:
          break;
      }
      this.startChain();
    },

    nested() {
      const { left, top } = commonParams.scene.getBoundingClientRect();
      this.position = { x: left, y: top };
      const { width, height } = sceneDimension;
      return [new GameActor(commonParams.scene, { width, height })];
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
