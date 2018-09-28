/* eslint-env browser */
import { parseDescription } from '../gamelibrary';
import { BEER_IPA } from '../types';
import { importAll, setImg } from '../helperslib';

const fillingImgSrc = {};
fillingImgSrc[BEER_IPA] = importAll(require.context('../img/IPA_filling_states', false, /\.png$/));
fillingImgSrc[BEER_IPA].overfilled = importAll(
  require.context('../img/IPA_overfilled_states', false, /\.png$/),
);
const mugsVolumes = {
  [BEER_IPA]: 4,
};

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
              faucet: {
                activeState: { switchOpened, beer },
              },
            } = target;
            const currTime = Date.now();
            if (switchOpened) {
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
              if (load[beer] < 1) {
                const fillingStages = fillingImgSrc[beer];
                const currFillingStage = Math.floor(load[beer] * fillingStages.length);
                setImg(target, fillingImgSrc[beer][currFillingStage], { width: '100%' });
              } else {
                target.overfilled = true;
                const overfilledIndex = Math.floor((((load[beer] - 1) / (1 / mugsVolumes[beer])) * 1000) / 500) % 2;
                setImg(target, fillingImgSrc[beer].overfilled[overfilledIndex], { width: '100%' });
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
