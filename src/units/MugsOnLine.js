/* eslint-env browser */
import {
  commonParams, getUnit, GameActor, parseDescription,
} from '../gamelibrary';
import mugIPA from '../img/IPA_mug_empty.png';
import { BEER_IPA } from '../types';
import { setImg } from '../helperslib';

export default parseDescription({
  MugsOnLine: {
    render(type, { left, top }) {
      const element = new GameActor(document.createElement('div'), { left, top });
      switch (type) {
        case BEER_IPA: {
          element.setPosition({ width: 50 });
          setImg(element, mugIPA, { width: '100%' });
          element.beerType = type;
          element.load = {};
          commonParams.origin.appendChild(element.node);
          return element;
        }

        default:
          return null;
      }
    },

    startPoint: { top: 220 },

    gap: 30,

    getType() {
      return BEER_IPA;
    },

    mechanism: {
      onTick: {
        type: 'onTick',
        customType: true,
        action({ target, memory }) {
          const curTime = Date.now();
          if (!target) {
            const newB = this.render(this.getType(), {
              left: commonParams.sceneWidth,
              top: this.startPoint.top,
            });
            memory.newborn = memory.foremost = newB;
            newB.lastMove = curTime;
            this.unit.addElement(newB);
          } else {
            const curL = target.left;
            if (target === memory.foremost) {
              memory.speed = commonParams.mugSpeed;
            }
            if (curL <= -target.width) {
              target.node.remove();
              memory.foremost = target.next;
              this.unit.delete(target);
            } else {
              const newL = curL + ((curTime - target.lastMove) * memory.speed) / 1000;
              target.setPosition({ left: newL });
              target.lastMove = curTime;
              if (target === memory.newborn) {
                const possibleP = newL + target.width + this.gap;
                if (possibleP < commonParams.sceneWidth) {
                  const newB = this.render(this.getType(), {
                    left: possibleP,
                    top: this.startPoint.top,
                  });
                  target.next = memory.newborn = newB;
                  newB.lastMove = curTime;
                  this.unit.addElement(newB);
                }
              }
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
