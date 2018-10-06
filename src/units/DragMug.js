/* eslint-env browser */
import { getUnit, parseDescription } from '../gamelibrary';
import { fireEvent } from '../eventswork';

export default parseDescription({
  DragMug: {
    mechanism: {
      followMouse: {
        type: 'followMouse',
        customType: true,
        action({ target, event: { x, y } }) {
          if (target) {
            const { width, height } = target.img.getBoundingClientRect();
            const { scaleFactor } = target;
            target.setPosition({
              left: x - width / scaleFactor / 2,
              top: y - height / scaleFactor / 2,
            });
            fireEvent(getUnit('DropPlaces'), 'checkEnter', {
              mug: target,
              tryToPlace: false,
            });
          }
        },
      },

      stopDrag: {
        type: 'stopDrag',
        customType: true,
        action({ target }) {
          if (target) {
            fireEvent(getUnit('DropPlaces'), 'checkEnter', {
              mug: target,
              tryToPlace: true,
            });
          }
        },
      },
    },
  },
});
