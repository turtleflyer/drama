/* eslint-env browser */
import { GameActor, parseDescription, getUnit } from '../gamelibrary';
import { fireEvent } from '../eventswork';
import { updateStyle } from '../helperslib';

function percentOverlap(targetBound, dragBound) {
  function linearOverlap(s1, e1, s2, e2) {
    const c = Math.min(e1 - s2, e2 - s1);
    return c < 0 ? 0 : c;
  }

  const {
    left: tLeft, top: tTop, right: tRight, bottom: tBottom,
  } = targetBound;
  const {
    left: dLeft, top: dTop, right: dRight, bottom: dBottom, width, height,
  } = dragBound;
  const dragArea = width * height;
  const overlapArea = linearOverlap(tLeft, tRight, dLeft, dRight) * linearOverlap(tTop, tBottom, dTop, dBottom);
  return overlapArea / dragArea;
}

export default parseDescription({
  MugPlaces: {
    renderDamage(mugPlace, stage) {
      const position = { top: 5, width: 50, height: 50 };
      if (stage) {
        Object.assign(position, { left: -50 });
      } else {
        Object.assign(position, { right: -50 });
      }
      const element = new GameActor(document.createElement('div'), position);
      element.node.textContent = '-$5';
      mugPlace.node.appendChild(element.node);
      element.bornTime = Date.now();
      getUnit('Damages').addElement(element);
    },

    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const div = document.createElement('div');
        f.node.appendChild(div);
        const place = new GameActor(div, f.mugPlace);
        place.faucet = f;
        f.mugPlace = place;
        return place;
      });
    },

    mechanism: {
      checkEnter: {
        type: 'checkEnter',
        customType: true,
        action({ target, event: { mug, tryToPlace } }) {
          const placeRect = target.node.getBoundingClientRect();
          const mugRect = mug.img.getBoundingClientRect();
          const { faucet } = target;
          if (percentOverlap(placeRect, mugRect) > 0.75) {
            updateStyle(target.node, { 'background-color': 'rgba(255, 0, 0, 0.2)' });
            if (tryToPlace) {
              const MugFilling = getUnit('MugFilling');
              updateStyle(target.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
              if (!faucet.placedMug) {
                MugFilling.addElement(mug);
                mug.faucet = target.faucet;
                faucet.placedMug = mug;
                target.node.appendChild(mug.node);
                mug.setPosition({
                  top: null,
                  bottom: mugRect.height,
                  left: (placeRect.width - mugRect.width) / 2,
                });
                return;
              }
            }
          } else {
            updateStyle(target.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
          }
          if (tryToPlace) {
            const FallenMug = getUnit('FallenMug');
            FallenMug.addElement(mug);
            fireEvent(FallenMug, 'fallDown');
          }
        },
      },
    },
  },
});
