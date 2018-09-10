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
      mousemove: {
        action({ eventObj }) {
          const { clientX, clientY } = eventObj;
          eventObj.preventDefault();
          const dragMug = getUnit('DragMug');
          if (dragMug.size === 1) {
            fireEvent(dragMug, 'followmouse', {
              x: clientX - this.position.x,
              y: clientY - this.position.y,
            });
          }
        },
      },

      mouseup: {
        action({ eventObj }) {
          const { clientX, clientY } = eventObj;
          // eventObj.preventDefault();
          const dragMug = getUnit('DragMug');
          if (dragMug.size === 1) {
            fireEvent(dragMug, 'followmouse', {
              x: clientX - this.position.x,
              y: clientY - this.position.y,
            });
            fireEvent(dragMug, 'leaveunit');
          }
        },
      },
    },
  },
});
