/* eslint-env browser */
import {
  commonParams, GameActor, parseDescription, getUnit,
} from '../gamelibrary';
import barImg from '../img/bar.png';
import { fireEvent } from '../eventswork';
import { updateStyle, setImg } from '../helperslib';
import {
  toPlaceBar, faucetsProps, switchTypes, beerExpenses,
} from '../usingparams';

let bar;

export default parseDescription({
  Bar: {
    nested() {
      bar = this.renderBar();
      return [bar];
    },

    renderBar() {
      const div = document.createElement('div');
      const img = document.createElement('img');
      img.src = barImg;
      updateStyle(img, { height: '100%', width: '100%', 'object-fit': 'fill' });
      div.appendChild(img);
      commonParams.scene.appendChild(div);
      return new GameActor(div, toPlaceBar);
    },
  },

  Faucets: {
    getPlaces() {
      switch (commonParams.level) {
        case 0:
          this.faucetsProps = [0].map(e => faucetsProps[e]);
          break;

        default:
          break;
      }
    },

    renderFaucet({
      place: {
        left, top, width, height,
      },
      imgPhases,
      beerTypes,
      switchType,
      mugPlace,
      switchPlace,
      jetPlace,
    }) {
      const div = document.createElement('div');
      const faucet = new GameActor(div, {
        left,
        top,
        width,
        height,
      });
      Object.assign(faucet, {
        imgPhases,
        beerTypes,
        switchType,
        mugPlace,
        switchPlace,
        jetPlace,
        activeState: { beer: beerTypes[0], phase: 0 },
      });

      if (switchType === switchTypes.BROKEN || switchType === switchTypes.DUAL) {
        faucet.activeState.switchOpened = true;
      } else {
        faucet.activeState.switchOpened = false;
      }
      setImg(faucet, faucet.imgPhases[0], {
        height: '100%',
        width: '100%',
        left: '0',
        right: '0',
        'object-fit': 'contain',
      });
      return faucet;
    },

    nested() {
      this.getPlaces();
      const faucets = this.faucetsProps.map(f => this.renderFaucet(f));
      faucets.forEach(f => bar.node.appendChild(f.node));
      return faucets;
    },

    mechanism: {
      switchImg: {
        type: 'switchImg',
        customType: true,
        action({ target, event: { affected } }) {
          if (target === affected) {
            console.log('switchImg');
            const newPhase = 1 - target.activeState.phase;
            setImg(target, target.imgPhases[newPhase], {
              height: '100%',
              width: '100%',
              left: '0',
              right: '0',
              'object-fit': 'contain',
            });
            target.activeState.phase = newPhase;
          }
        },
      },

      countExpenses: {
        type: 'onTick',
        customType: true,
        action({ target }) {
          const currTime = Date.now();
          const { activeState } = target;
          if (activeState.switchOpened) {
            if (activeState.lastTime) {
              // prettier-ignore
              commonParams.money -= ((currTime - activeState.lastTime) / 1000)
                * beerExpenses[target.activeState.beer];
            }
            activeState.lastTime = currTime;
            fireEvent(getUnit('Score'), 'updateMoney');
          } else {
            activeState.lastTime = null;
          }
        },
      },
    },
  },
});
