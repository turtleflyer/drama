/* eslint-env browser */
// import imgIPAEmpty from './img/mugs/IPA/IPA_mug_empty.png';
import imgIPAEmpty from '../actor_classes/Mug/img/IPA/IPA_mug_empty.png';
import { importAll } from '../../../libs/helpers_lib';

export const beerTypes = { IPA: '@@beer/IPA' };

export const mugTypes = {
  [beerTypes.IPA]: {
    img: {
      width: 50,
      empty: imgIPAEmpty,
      fillingPhasesImgs: importAll(
        require.context('../actor_classes/Mug/img/IPA/IPA_filling_states', false, /\.png$/),
      ),
      overfilledPhasesImgs: importAll(
        require.context('../actor_classes/Mug/img/IPA/IPA_overfilled_states', false, /\.png$/),
      ),
    },
    volume: 4,
  },
};

export const mugsParams = {
  lineBase: 300,
  initialDelay: 100,
};

export const pulseTimeout = 5;

export const stageParams = {
  reputation: 1,
  drunkFactor: 0,
};

export const tuneGame = {
  reputationDecrement: -0.05,
  reputationIncrement: 3,
  drunkFactorIncrement: 0.02,
};

export const barPosition = {
  left: 75,
  top: 210,
  width: 350,
  height: 285,
};

export const switchTypes = {
  NORMAL: '@@switchType/NORMAL',
  BROKEN: '@@switchType/BROKEN',
  DUAL: '@@switchType/DUAL',
};

export const faucetModels = {
  normalIPA: {
    size: {
      width: 110,
      height: 275,
    },
    imgPhases: importAll(require.context('../actor_classes/Faucet/img/normalIPA', false, /\.png$/)),
    beerTypes: [beerTypes.IPA],
    switchType: switchTypes.NORMAL,
    mugPlacePosition: {
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
};

export const customersTablePosition = {
  left: 50,
  top: 80,
  width: 250,
  hookPlace: {
    top: 11,
    height: 90,
    left: 58,
    right: 58,
  },
};
