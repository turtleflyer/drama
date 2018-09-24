/* eslint-env browser */
import {
  commonParams, GameActor, parseDescription, updateStyle, getUnit,
} from '../gamelibrary';
import faucetImg1 from '../img/faucet-s1.png';
import faucetImg2 from '../img/faucet-s2.png';
import barImg from '../img/bar.png';
import jetIPAImg from '../img/jet.gif';
import { fireEvent } from '../eventswork';
import { BEER_IPA } from '../types';

const switchTypes = {
  NORMAL: '@@switchType/NORMAL',
  BROKEN: '@@switchType/BROKEN',
  DUAL: '@@switchType/DUAL',
};

const jetsMap = new Map([[BEER_IPA, jetIPAImg]]);

const toPlaceBar = {
  left: 75,
  top: 210,
  width: 245,
  height: 285,
};

const faucetsProps = [
  {
    place: {
      left: 100,
      top: 10,
      width: 110,
      height: 275,
    },
    imgPhases: [faucetImg1, faucetImg2],
    beerTypes: [BEER_IPA],
    switchType: switchTypes.NORMAL,
    mugPlace: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
    },
    switchPlace: {
      width: 50,
      height: 40,
      top: 0,
      left: 40,
    },
    jetPlace: {
      height: 80,
      top: 130,
      left: 17,
    },
  },
  {
    place: {
      left: 10,
      top: 10,
      width: 110,
      height: 275,
    },
    imgPhases: [faucetImg1, faucetImg2],
    beerTypes: [BEER_IPA],
    switchType: switchTypes.NORMAL,
    mugPlace: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
    },
    switchPlace: {
      width: 50,
      height: 40,
      top: 0,
      left: 40,
    },
  },
  {
    place: {
      left: 130,
      top: 10,
      width: 110,
      height: 275,
    },
    imgPhases: [faucetImg1, faucetImg2],
    beerTypes: [BEER_IPA],
    switchType: switchTypes.NORMAL,
    mugPlace: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
    },
    switchPlace: {
      width: 50,
      height: 40,
      top: 0,
      left: 40,
    },
  },
];

let bar;

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
  Bar: {
    nested() {
      bar = this.renderBar(commonParams.scaleFactor);
      return [bar];
    },

    renderBar(scaleF) {
      const div = document.createElement('div');
      const img = document.createElement('img');
      img.src = barImg;
      updateStyle(img, { height: '100%', width: '100%', 'object-fit': 'fill' });
      div.appendChild(img);
      commonParams.origin.appendChild(div);
      return new GameActor(div, toPlaceBar, scaleF);
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

    setImg(element, index) {
      const img = document.createElement('img');
      img.src = element.imgPhases[index];
      updateStyle(img, {
        height: '100%',
        width: '100%',
        left: '0',
        right: '0',
        'object-fit': 'contain',
      });
      element.node.appendChild(img);
      if (element.img) {
        element.img.remove();
      }
      element.img = img;
    },

    renderFaucet(
      {
        place: {
          left, top, width, height,
        },
        imgPhases,
        beerTypes,
        switchType,
        mugPlace,
        switchPlace,
        jetPlace,
      },
      scaleF,
    ) {
      const div = document.createElement('div');
      const faucet = new GameActor(
        div,
        {
          left,
          top,
          width,
          height,
        },
        scaleF,
      );
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
      this.setImg(faucet, 0);
      return faucet;
    },

    nested() {
      this.getPlaces();
      const faucets = this.faucetsProps.map(f => this.renderFaucet(f, commonParams.scaleFactor));
      faucets.forEach(f => bar.node.appendChild(f.node));
      return faucets;
    },

    mechanism: {
      switchImg: {
        type: 'switchImg',
        customType: true,
        action({ target, event: { affected } }) {
          if (target === affected) {
            const newPhase = 1 - target.activeState.phase;
            this.setImg(target, newPhase);
            target.activeState.phase = newPhase;
          }
        },
      },
    },
  },

  FaucetSwitches: {
    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const div = document.createElement('div');
        f.node.appendChild(div);
        const faucetSwitch = new GameActor(div, f.switchPlace, commonParams.scaleFactor);
        faucetSwitch.faucet = f;
        f.switch = faucetSwitch;
        return faucetSwitch;
      });
    },

    mechanism: {
      switchState: {
        type: 'click',
        action({ target, event }) {
          event.preventDefault();
          event.stopPropagation();
          const { faucet } = target;
          const { switchType, beerTypes, activeState } = faucet;
          const Faucets = getUnit('Faucets');
          switch (switchType) {
            case switchTypes.NORMAL:
              activeState.switchOpened = !activeState.switchOpened;
              fireEvent(Faucets, 'switchImg', { affected: faucet });
              break;

            case switchTypes.DUAL:
              [activeState.beer] = beerTypes.filter(b => b !== activeState.beer);
              fireEvent(Faucets, 'switchImg', { affected: faucet });
              break;

            default:
              break;
          }
          fireEvent(getUnit('BeerJet'), 'setJet');
        },
      },
    },
  },

  BeerJet: {
    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const div = document.createElement('div');
        f.node.appendChild(div);
        const jet = new GameActor(div, f.jetPlace, commonParams.scaleFactor);
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

  MugPlaces: {
    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const div = document.createElement('div');
        f.node.appendChild(div);
        const place = new GameActor(div, f.mugPlace, commonParams.scaleFactor);
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
          if (percentOverlap(placeRect, mugRect) > 0.75) {
            updateStyle(target.node, { 'background-color': 'rgba(255, 0, 0, 0.2)' });
            if (tryToPlace) {
              const MugFilling = getUnit('MugFilling');
              updateStyle(target.node, { 'background-color': 'rgba(255, 255, 255, 0.2)' });
              if (![...MugFilling].find(m => m.faucet === target.faucet)) {
                MugFilling.addElement(mug);
                mug.faucet = target.faucet;
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
