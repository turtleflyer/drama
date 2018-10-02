/* eslint-env browser */
import { parseDescription } from '../gamelibrary';
import { importAll, setImg } from '../helperslib';
import { beerTypes, mugsVolumes } from '../usingparams';

const fillingImgSrc = {};
fillingImgSrc[beerTypes.BEER_IPA] = importAll(
  require.context('../img/IPA_filling_states', false, /\.png$/),
);
fillingImgSrc[beerTypes.BEER_IPA].overfilled = importAll(
  require.context('../img/IPA_overfilled_states', false, /\.png$/),
);

export default parseDescription({
  MugFilling: {
    mechanism: {
      filling: {
        type: 'onTick',
        customType: true,
        action({ target }) {
          if (target) {
            const {
              load,
              lastFillState,
              overfillState,
              faucet: { activeState },
            } = target;
            const { switchOpened, beer, imgFillingStage } = activeState;
            const currTime = Date.now();
            if (switchOpened) {
              if (!overfillState) {
                if (load[beer] === undefined) {
                  load[beer] = 0;
                  target.lastFillState = { beer, lastTime: currTime };
                } else if (lastFillState.beer === beer) {
                  load[beer]
                    += ((currTime - lastFillState.lastTime) / 1000) * (1 / mugsVolumes[beer]);
                  lastFillState.lastTime = currTime;
                } else {
                  target.lastFillState = { beer, lastTime: currTime };
                }
                if (Object.keys(load).reduce((total, b) => total + load[b], 0) < 1) {
                  const fillingStages = fillingImgSrc[beer];
                  const newImgFillingStage = Math.floor(load[beer] * fillingStages.length);
                  if (newImgFillingStage !== imgFillingStage) {
                    setImg(target, fillingImgSrc[beer][newImgFillingStage], { width: '100%' });
                    activeState.imgFillingStage = newImgFillingStage;
                  }
                } else {
                  target.overfillState = { imageIndex: 1 };
                }
              } else {
                const { countInterval, imageIndex } = overfillState;
                if (!countInterval || currTime - countInterval > 1000) {
                  overfillState.countInterval = currTime;
                  overfillState.imageIndex = 1 - imageIndex;
                  setImg(target, fillingImgSrc[beer].overfilled[overfillState.imageIndex], {
                    width: '100%',
                  });
                }
              }
            } else {
              target.lastFillState = {};
            }
          }
        },
      },
    },
  },
});
