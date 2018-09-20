/* eslint-env browser */
import { getUnit, parseDescription, updateStyle } from '../../gamelibrary';
import { fireEvent } from '../../eventswork';

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
            fireEvent(getUnit('MugPlaces'), 'checkEnter', {
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
            fireEvent(getUnit('MugPlaces'), 'checkEnter', {
              mug: target,
              tryToPlace: true,
            });
          }
        },
      },
    },
  },

  FallenMug: {
    mechanism: {
      fallDown: {
        type: 'fallDown',
        customType: true,
        action({ target }) {
          updateStyle(target.node, { transform: 'scale(0.5)' });
          window.setTimeout(() => {
            target.node.remove();
            this.unit.delete(target);
          }, 1000);
        },
      },
    },
  },
});
