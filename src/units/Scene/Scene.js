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
      this.position = {
        x: commonParams.origin.offsetLeft - 1,
        y: commonParams.origin.offsetTop - 1,
      };
      const { sceneWidth, sceneHeight } = commonParams;
      return [
        new GameActor(commonParams.origin, {
          width: sceneWidth,
          height: sceneHeight,
        }),
        getUnit('MugsOnLine'),
        getUnit('DragMug'),
      ];
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
        action({ eventObj }) {
          const { clientX, clientY } = eventObj;
          console.log('clientX, clientY: ', clientX, clientY);
          eventObj.preventDefault();
          const dragMug = getUnit('DragMug');
          if (dragMug.size === 1) {
            fireEvent(dragMug, 'followMouse', {
              x: clientX - this.position.x,
              y: clientY - this.position.y,
            });
          }
        },
      },

      stopDnD: {
        type: 'mouseup',
        action({ eventObj }) {
          const { clientX, clientY } = eventObj;
          // eventObj.preventDefault();
          const dragMug = getUnit('DragMug');
          if (dragMug.size === 1) {
            fireEvent(dragMug, 'followMouse', {
              x: clientX - this.position.x,
              y: clientY - this.position.y,
            });
            fireEvent(dragMug, 'leaveUnit');
          }
        },
      },
    },
  },
});
