/* eslint-env browser */
import {
  commonParams, GameActor, parseDescription, getUnit,
} from '../gamelibrary';
import faucetImg1 from '../img/faucet-s1.png';
import faucetImg2 from '../img/faucet-s2.png';
import barImg from '../img/bar.png';
import { fireEvent } from '../eventswork';
import { BEER_IPA } from '../types';
import { updateStyle, setImg } from '../helperslib';

const switchTypes = {
  NORMAL: '@@switchType/NORMAL',
  BROKEN: '@@switchType/BROKEN',
  DUAL: '@@switchType/DUAL',
};

const beerExpenses = { [BEER_IPA]: 5 };

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
      bar = this.renderBar();
      return [bar];
    },

    renderBar() {
      const div = document.createElement('div');
      const img = document.createElement('img');
      img.src = barImg;
      updateStyle(img, { height: '100%', width: '100%', 'object-fit': 'fill' });
      div.appendChild(img);
      commonParams.origin.appendChild(div);
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
              commonParams.money
                -= ((currTime - activeState.lastTime) / 1000) * beerExpenses[target.activeState.beer];
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

  FaucetSwitches: {
    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const div = document.createElement('div');
        f.node.appendChild(div);
        const faucetSwitch = new GameActor(div, f.switchPlace);
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

      monitorWasting: {
        type: 'onTick',
        customType: true,
        action({ target }) {
          const {
            faucet: {
              placedMug,
              activeState: { switchOpened, beer },
            },
            startWasting,
          } = target;
          let wastingStatus = false;
          if (switchOpened && (!placedMug || placedMug.overfilled)) {
            wastingStatus = true;
          }
          if (wastingStatus) {
            const currTime = Date.now();
            if (startWasting) {
              const countWastingMoney = Math.floor(
                (((currTime - startWasting) / 1000) * beerExpenses[beer]) / 5,
              );
              if (countWastingMoney > target.countWastingMoney) {
                this.renderDamage(target, countWastingMoney % 2);
                target.countWastingMoney = countWastingMoney;
              }
            } else {
              target.startWasting = currTime;
              target.countWastingMoney = 0;
            }
          } else {
            target.startWasting = null;
          }
        },
      },
    },
  },
});
