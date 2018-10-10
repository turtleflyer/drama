/* eslint-env browser */
import { getUnit, parseDescription } from '../gamelibrary';
import { updateStyle, percentOverlap } from '../helperslib';
import { fireEvent, makeUnit } from '../eventswork';

const lastCheck = makeUnit([]);

export default parseDescription({
  DropPlaces: {
    nested: () => [getUnit('MugPlaces'), getUnit('CustomersTable'), lastCheck],

    mechanism: {
      checkEnter: {
        type: 'checkEnter',
        customType: true,
        action({ target, event: { mug, tryToPlace } }) {
          if (tryToPlace) {
            if (!target) {
              if (!mug.placed) {
                const FallenMug = getUnit('FallenMug');
                FallenMug.addElement(mug);
                // fireEvent(FallenMug, 'fallDown');
              }
            } else {
              const placeRect = target.node.getBoundingClientRect();
              const mugRect = mug.img.getBoundingClientRect();
              if (percentOverlap(placeRect, mugRect) > 0.75) {
                switch (true) {
                  case target.mugPlace:
                    {
                      const { faucet } = target;
                      if (!faucet.placedMug) {
                        const MugFilling = getUnit('MugFilling');
                        MugFilling.addElement(mug);
                        mug.faucet = target.faucet;
                        faucet.placedMug = mug;
                        target.node.appendChild(mug.node);
                        mug.setPosition({
                          top: null,
                          bottom: mugRect.height,
                          left: (placeRect.width - mugRect.width) / 2,
                        });
                        mug.placed = true;
                      }
                    }
                    break;

                  case target.customersTable:
                    {
                      const MugWaiting = getUnit('MugWaiting');
                      MugWaiting.addElement(mug);
                      target.node.appendChild(mug.node);
                      mug.setPosition({
                        top: null,
                        bottom: mugRect.height + placeRect.height / 4,
                        left: mugRect.left - placeRect.left,
                      });
                      mug.placed = true;
                    }
                    break;

                  default:
                    break;
                }
              }
            }
          } else if (target) {
            const placeRect = target.node.getBoundingClientRect();
            const mugRect = mug.img.getBoundingClientRect();
            if (percentOverlap(placeRect, mugRect) > 0.75) {
              updateStyle(target.node, { 'background-color': 'rgba(255, 0, 0, 0.2)' });
            } else {
              updateStyle(target.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
            }
          }
        },
      },
    },
  },
});
