/* eslint-env browser */
import {
  commonParams, GameActor, parseDescription, updateStyle, getUnit,
} from '../../gamelibrary';
import faucetImg1 from '../../img/faucet-s1.png';
import faucetImg2 from '../../img/faucet-s2.png';
import barImg from '../../img/bar.png';
import { fireEvent } from '../../eventswork';
import { BEER_IPA } from '../../types';

const switchTypes = {
  NORMAL: '@@switchType/NORMAL',
  BROKEN: '@@switchType/BROKEN',
  DUAL: '@@switchType/DUAL',
};

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
    placeMug: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
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
    placeMug: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
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
    placeMug: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
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

    renderFaucet(
      {
        place: {
          left, top, width, height,
        },
        imgPhases,
        beerTypes,
        switchType,
        placeMug,
      },
      scaleF,
    ) {
      const div = document.createElement('div');
      const img = document.createElement('img');
      [img.src] = imgPhases;
      updateStyle(img, {
        height: '100%',
        width: '100%',
        left: '0',
        right: '0',
        'object-fit': 'contain',
      });
      div.appendChild(img);
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
        placeMug,
      });
      return faucet;
    },

    nested() {
      this.getPlaces();
      const faucets = this.faucetsProps.map(f => this.renderFaucet(f, commonParams.scaleFactor));
      faucets.forEach(f => bar.node.appendChild(f.node));
      return faucets;
    },
  },

  FaucetSwitches: {},

  MugPlaces: {
    nested() {
      return [...getUnit('Faucets')].map((f) => {
        const div = document.createElement('div');
        f.node.appendChild(div);
        updateStyle(div, {
          margin: 'auto',
          // left: '0',
          // right: '0',
          // bottom: '0',
        });
        console.log('f.placeMug: ', f.placeMug);
        return new GameActor(div, f.placeMug, commonParams.scaleFactor);
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
            updateStyle(target.node, { 'background-color': 'red' });
            if (tryToPlace) {
              const MugFilling = getUnit('MugFilling');
              MugFilling.addElement(mug);
              target.node.appendChild(mug.node);
              mug.setPosition({
                top: null,
                bottom: mugRect.height,
                left: (placeRect.width - mugRect.width) / 2,
              });
            }
          } else {
            updateStyle(target.node, { 'background-color': 'white' });
            if (tryToPlace) {
              const FallenMug = getUnit('FallenMug');
              FallenMug.addElement(mug);
              fireEvent(FallenMug, 'fallDown');
            }
          }
        },
      },
    },
  },

  MugFilling: {},
});
