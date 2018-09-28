/* eslint-env browser */
import { GameActor, parseDescription, getUnit } from '../gamelibrary';
import jetIPAImg from '../img/jet.gif';
import { BEER_IPA } from '../types';
import { updateStyle } from '../helperslib';

const jetsMap = new Map([[BEER_IPA, jetIPAImg]]);

export default parseDescription({
  BeerJet: {
    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const div = document.createElement('div');
        f.node.appendChild(div);
        const jet = new GameActor(div, f.jetPlace);
        jet.faucet = f;
        f.jet = jet;
        return jet;
      });
    },

    mechanism: {
      setJet: {
        type: 'setJet',
        customType: true,
        action({ target }) {
          const { beer, switchOpened } = target.faucet.activeState;
          if (target.img) {
            target.img.remove();
            target.img = null;
          }
          if (switchOpened) {
            const img = document.createElement('img');
            img.src = jetsMap.get(beer);
            updateStyle(img, { height: '100%' });
            target.node.appendChild(img);
            target.img = img;
          }
        },
        fireImmediately: true,
      },
    },
  },
});
