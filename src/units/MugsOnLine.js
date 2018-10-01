/* eslint-env browser */
import {
  commonParams, getUnit, GameActor, parseDescription,
} from '../gamelibrary';
import mugIPA from '../img/IPA_mug_empty.png';
import { BEER_IPA } from '../types';
import { setImg } from '../helperslib';

const topDistance = 220;
const gapBetweenMugs = 30;

export default parseDescription({
  MugsOnLine: {
    renderMug(type, left) {
      const element = new GameActor(document.createElement('div'), { left, top: topDistance });
      switch (type) {
        case BEER_IPA: {
          element.setPosition({ width: 50 });
          setImg(element, mugIPA, { width: '100%' });
          element.beerType = type;
          element.load = {};
          commonParams.scene.appendChild(element.node);
          return element;
        }

        default:
          return null;
      }
    },

    getType() {
      return BEER_IPA;
    },

    mechanism: {
      onTick: {
        type: 'onTick',
        customType: true,
        action({ target, memory }) {
          const currTime = Date.now();
          const {
            positionsMap, lastPosition, lastTime, lastMug,
          } = memory;
          if (!positionsMap) {
            const newbornPosition = commonParams.sceneWidth - 1;
            const newbornMug = this.renderMug(this.getType(), newbornPosition);
            this.unit.addElement(newbornMug);
            memory.positionsMap = new Map([[newbornMug, newbornPosition]]);
            memory.lastPosition = newbornPosition;
            memory.lastTime = currTime;
            memory.lastMug = newbornMug;
          } else {
            const { left, width } = target;
            if (left >= lastPosition) {
              const shift = ((currTime - lastTime) / 1000) * commonParams.mugsSpeed;
              let expectedNewbornPosition;
              for (const [mug, position] of positionsMap.entries()) {
                const newPosition = position + shift;
                positionsMap.set(mug, newPosition);
                if (mug === lastMug) {
                  expectedNewbornPosition = newPosition + mug.width + gapBetweenMugs;
                }
              }
              memory.lastTime = currTime;
              if (expectedNewbornPosition < commonParams.sceneWidth) {
                const newbornMug = this.renderMug(this.getType(), expectedNewbornPosition);
                this.unit.addElement(newbornMug);
                positionsMap.set(newbornMug, expectedNewbornPosition);
                memory.lastMug = newbornMug;
              }
            }
            const newPosition = positionsMap.get(target);
            if (newPosition + width <= 0) {
              target.node.remove();
              this.unit.delete(target);
              positionsMap.delete(target);
            } else {
              target.setPosition({ left: newPosition });
              memory.lastPosition = newPosition;
            }
          }
        },
      },

      startDnD: {
        type: 'mousedown',
        action({ target, event }) {
          event.preventDefault();
          getUnit('DragMug').addElement(target);
        },
      },
    },
  },
});
