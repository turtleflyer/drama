/* eslint-env browser */
import { getUnit, parseDescription, commonParams } from '../gamelibrary';

const emptyElement = Symbol('@@emptyElement');

export default parseDescription({
  Mugs: {
    nested: () => [getUnit('MugsOnLine'), getUnit('MugFilling'), emptyElement],

    mechanism: {
      startDnD: {
        type: 'mousedown',
        action({ target, unit, event }) {
          if (target !== emptyElement) {
            event.preventDefault();
            const MugFilling = getUnit('MugFilling');
            if (unit === MugFilling) {
              MugFilling.delete(target);
              target.faucet.placedMug = null;
              target.faucet = null;
              target.placed = false;
            }
            commonParams.scene.appendChild(target.node);
            getUnit('DragMug').addElement(target);
          }
        },
      },
    },
  },
});
