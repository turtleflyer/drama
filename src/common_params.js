/* eslint-env browser */
import imgIPAEmpty from './img/mugs/IPA/IPA_mug_empty.png';
import { importAll } from './helpers_lib';

export const stageDimension = {
  width: 1024,
  height: 640,
};

const BEER_IPA = '@@beer/IPA';
export const beerTypes = { BEER_IPA };

export const mugTypes = {
  [BEER_IPA]: {
    width: 50,
    empty: imgIPAEmpty,
    fillingStates: importAll(
      require.context('../src/img/mugs/IPA/IPA_filling_states', false, /\.png$/),
    ),
    overfilledStates: importAll(
      require.context('../src/img/mugs/IPA/IPA_overfilled_states', false, /\.png$/),
    ),
  },
};

export const mugsParams = {
  lineBase: 300,
  initialDelay: 100,
};

export const pulseTimeout = 5;

export const tuneGame = {
  reputationDecrement: -5,
  reputationIncrement: 3,
  drunkFactorIncrement: 0.02,
};
