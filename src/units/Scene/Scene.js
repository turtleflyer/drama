/* eslint-env browser */
import {
  commonParams,
  getUnit,
  appendPx,
  GameActor,
  parseDescription,
  startModules,
} from '../../gamelibrary';
import {
  makeUnit, registerEventType, fireEvent, eventChain,
} from '../../eventswork';

export default parseDescription({
  Scene: {
    nested() {
      const { left, top } = commonParams.origin.getBoundingClientRect();
      this.position = { x: left, y: top };
      const { sceneWidth, sceneHeight } = commonParams;
      return [
        new GameActor(
          commonParams.origin,
          {
            width: sceneWidth,
            height: sceneHeight,
          },
          0.5,
        ),
        getUnit('MugsOnLine'),
        getUnit('DragMug'),
      ];
    },

    mouseWork(target, eventObj, afterwork = () => {}) {
      const { clientX, clientY } = eventObj;
      const { scaleFactor } = target;
      const dragMug = getUnit('DragMug');
      if (dragMug.size === 1) {
        fireEvent(dragMug, 'followMouse', {
          x: (clientX - this.position.x) / scaleFactor,
          y: (clientY - this.position.y) / scaleFactor,
        });
        afterwork();
      }
    },

    mechanism: {
      stop: {
        type: 'stop',
        regAsCustom: true,
        action({ unit, target }) {
          if (unit !== this.unit) {
            unit.description.toTerminate = true;
            target.node.remove();
            unit.clear();
          }
          setTimeout(() => {
            this.toTerminate = true;
          }, 500);
        },
      },

      dragND: {
        type: 'mousemove',
        action({ target, eventObj }) {
          eventObj.preventDefault();
          this.mouseWork(target, eventObj);
        },
      },

      stopDnD: {
        type: 'mouseup',
        action({ target, eventObj }) {
          const dragMug = getUnit('DragMug');
          this.mouseWork(target, eventObj, () => fireEvent(dragMug, 'leaveUnit'));
        },
      },
    },
  },
});
