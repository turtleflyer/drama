/* eslint-env browser */
import imgIPAEmpty from './img/IPA/IPA_mug_empty.png';
import { importAll } from '../../../../libs/helpers_lib';
import { beerTypes } from '../../../../stage/gameplay_params';
import emptyGlassImg from './img/whiskeyGlass/glass_empty.png';
import fullGlassImg from './img/whiskeyGlass/glass_full.png';

export const mugTypes = {
  [beerTypes.IPA]: {
    img: {
      width: 50,
      empty: imgIPAEmpty,
      fillingPhasesImgs: importAll(
        require.context('./img/IPA/IPA_filling_states', false, /\.png$/),
      ),
      overfilledPhasesImgs: importAll(
        require.context('./img/IPA/IPA_overfilled_states', false, /\.png$/),
      ),
    },
    volume: 4,
  },
};

export const mugsParams = {
  overfillPhaseDuration: 800,
};

export const magsCreatingParams = {
  lineBase: 300,
  initialDelay: 1,
  maxDelayToGenerateNext: 8,
};

export const whiskeyGlassParams = {
  img: {
    width: 35,
    empty: emptyGlassImg,
    full: fullGlassImg,
  },
  volume: 2,
  costOfFilledGlass: 30,
};
