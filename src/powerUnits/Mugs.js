/* eslint-env browser */
import { getUnit, parseDescription, commonParams } from '../gamelibrary';

export default parseDescription({
  Mugs: {
    nested: () => [getUnit('MugsOnLine'), getUnit('MugFilling')],

    mechanism: {
      startDnD: {
        type: 'mousedown',
        action({ target, unit, event }) {
          event.preventDefault();
          const MugFilling = getUnit('MugFilling');
          if (unit === MugFilling) {
            MugFilling.delete(target);
            target.faucet.placedMug = null;
            target.faucet = null;
            target.placed = false;
          }
          target.setPosition({ left: 10000, top: 1000 });
          commonParams.scene.appendChild(target.node);
          getUnit('DragMug').addElement(target);
        },
      },
    },
  },
});
