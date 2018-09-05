/* eslint-env browser */
import {
  registeredUnites,
  appendPx,
  makeScalable,
  setOrigin,
  parseDescription,
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

const BeerMug = {
  name: 'BeerMug',
  render(origin, type, left, top, scaleF) {
    const div = makeScalable(document.createElement('div'), scaleF);
    div.className = 'BeerMug';
    switch (type) {
      case BEER_IPA: {
        div.setSizePos({
          left,
          top,
          width: 50,
        });
        const img = document.createElement('img');
        img.src = mugIPA;
        img.style.width = '100%';
        div.appendChild(img);
        origin.appendChild(div);
        return div;
      }

      default:
        return null;
    }
  },

  mechanism: {
    ontick10: {
      regAsCustom: true,
      action({ target }) {
        if (!target) {
          const newB = this.render(BEER_IPA, 0, 0);
          newB.AAA = c;
          c++;
          registeredUnites.BeerMug.addElement(newB);
        } else {
          const curX = target.leftN;
          target.setSizePos({ left: curX + 20 });
          if (curX > 580) {
            registeredUnites.BeerMug.delete(target);
          }
          if (target === [...registeredUnites.BeerMug][registeredUnites.BeerMug.size - 1]) {
            if (curX > 5) {
              const newB = this.render(BEER_IPA, curX - 35, 0);
              newB.AAA = c;
              c++;
              registeredUnites.BeerMug.addElement(newB);
            }
          }
        }
      },
    },
  },
};

export default BeerMug;
