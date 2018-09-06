/* eslint-env browser */
import {
  appendPx, makeScalable, setOrigin, parseDescription, GameActor,
} from '../../gamelabrary';
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

let c = 0;
export default parseDescription({
  BeerMug: {
    render: toolkit => function (type, left, top, scaleF) {
      const div = document.createElement('div');
      const element = new GameActor(div, scaleF, { left, top });
      switch (type) {
        case BEER_IPA: {
          element.setPosition({ width: 50 });
          const img = document.createElement('img');
          img.src = mugIPA;
          img.style.width = '100%';
          div.appendChild(img);
          toolkit.origin.appendChild(div);
          return element;
        }

        default:
          return null;
      }
    },

    mechanism: {
      ontick: {
        regAsCustom: true,
        action: () => function ({ target }) {
          if (!target) {
            const newB = this.render(BEER_IPA, 0, 0);
            newB.AAA = c;
            c++;
            this.unit.addElement(newB);
          } else {
            const curX = target.left;
            target.setPosition({ left: curX + 2 });
            if (curX > 598) {
              this.unit.delete(target);
            }
            if (target === [...this.unit][this.unit.size - 1]) {
              if (curX > 5) {
                const newB = this.render(BEER_IPA, curX - 53, 0);
                newB.AAA = c;
                c++;
                this.unit.addElement(newB);
              }
            }
          }
        },
      },
    },
  },
});
