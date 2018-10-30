/* eslint-env browser */
// import imgIPAEmpty from './img/mugs/IPA/IPA_mug_empty.png';
import imgIPAEmpty from '../actor_classes/Mug/img/IPA/IPA_mug_empty.png';
import { importAll } from '../../../libs/helpers_lib';

const BEER_IPA = '@@beer/IPA';
export const beerTypes = { BEER_IPA };

export const mugTypes = {
  [BEER_IPA]: {
    width: 50,
    empty: imgIPAEmpty,
    fillingStates: importAll(
      require.context(
        '../actor_classes/Mug/img/IPA/IPA_filling_states',
        false,
        /\.png$/,
      ),
    ),
    overfilledStates: importAll(
      require.context(
        '../actor_classes/Mug/img/IPA/IPA_overfilled_states',
        false,
        /\.png$/,
      ),
    ),
  },
};

export const mugsParams = {
  lineBase: 300,
  initialDelay: 100,
};

export const pulseTimeout = 5;

export const stageParams = {
  reputation: 100,
  drunkFactor: 1,
};

export const tuneGame = {
  reputationDecrement: -5,
  reputationIncrement: 3,
  drunkFactorIncrement: 0.02,
};

export const barPosition = {
  left: 75,
  top: 210,
  width: 245,
  height: 285,
};
