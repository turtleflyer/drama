/* eslint-env browser */
import {
  commonParams,
  getUnit,
  appendPx,
  GameActor,
  parseDescription,
  startModules,
} from '../../gamelibrary';
// import {
//   makeUnit,
//   registerUnit,
//   getRegisteredUnit,
//   registerEventType,
//   fireEvent,
//   eventChain,
// } from '../../eventswork';
import mugIPA from './mug1.png';
import { BEER_IPA } from '../../types';

let a = 0;
export default parseDescription({
  BeerMug: {
    render(type, left, top, scaleF) {
      const element = new GameActor(document.createElement('div'), { left, top }, scaleF);
      switch (type) {
        case BEER_IPA: {
          element.setPosition({ width: 50 });
          const img = document.createElement('img');
          img.src = mugIPA;
          img.style.width = '100%';
          element.node.appendChild(img);
          commonParams.origin.appendChild(element.node);
          return element;
        }

        default:
          return null;
      }
    },

    startPoint: { top: 200 },

    gap: 5,

    getType() {
      return BEER_IPA;
    },

    mechanism: {
      ontick: {
        regAsCustom: true,
        action({ target, memory }) {
          const curTime = Date.now();
          if (!target) {
            a = curTime;
            const newB = this.render(this.getType(), commonParams.sceneWidth, this.startPoint.top);
            memory.newborn = memory.foremost = newB;
            // newB.lastMove = curTime;
            this.unit.addElement(newB);
            // memory.times = [];
            // memory.getAverageInterval = () => memory.times.reduce((s, t) => s + t) / memory.times.length;
          } else {
            // let timeout;
            // if (!memory.averageTimeout) {
            //   memory.times.push(curTime - target.lastMove);
            //   timeout = memory.getAverageInterval();
            //   if (memory.times.length === 100) {
            //     memory.averageTimeout = timeout;
            //   }
            // } else {
            //   timeout = memory.averageTimeout;
            // }
            const curL = target.left;
            if (target === memory.foremost) {
              memory.speed = commonParams.mugSpeed - ((curTime - a) * 1) / 1000;
            }
            if (curL <= -target.width) {
              target.node.remove();
              memory.foremost = target.next;
              this.unit.delete(target);
            } else {
              // const newL = curL + ((curTime - target.lastMove) * memory.speed) / 1000;
              // const newL = curL + (timeout * memory.speed) / 1000;
              const newL = curL + (commonParams.tickTimeout * memory.speed) / 1000;
              target.setPosition({ left: newL });
              target.lastMove = curTime;
              if (target === memory.newborn) {
                const possibleP = newL + target.width + this.gap;
                if (possibleP < commonParams.sceneWidth) {
                  const newB = this.render(this.getType(), possibleP, this.startPoint.top);
                  target.next = memory.newborn = newB;
                  // newB.lastMove = curTime;
                  this.unit.addElement(newB);
                }
              }
            }
          }
        },
      },

      click: {
        action({ target }) {
          target.refreshScale(1.5);
        },
      },
    },
  },
});
