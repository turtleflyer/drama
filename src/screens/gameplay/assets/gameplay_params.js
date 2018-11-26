/* eslint-env browser */
// import imgIPAEmpty from './img/mugs/IPA/IPA_mug_empty.png';
import imgIPAEmpty from '../actor_classes/Mug/img/IPA/IPA_mug_empty.png';
import { importAll } from '../../../libs/helpers_lib';

export const beerTypes = { IPA: '@@beerTypes/IPA' };

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

export const beerCost = { [beerTypes.IPA]: 5 };

export const mugsParams = {
  lineBase: 300,
  initialDelay: 3,
  maxDelayToGenerateNext: 8,
};

export const pulseTimeout = 16;
export const rotationAngleOfDayAndNight = 160;

export const tuneGame = {
  reputationDecrement: -0.05,
  reputationIncrement: 0.03,
  drunkFactorIncrement: 0.02,
  beerMarkup: 3.5,
};

export const barPosition = {
  left: 75,
  top: 210,
  width: 350,
  height: 285,
};

export const switchTypes = {
  NORMAL: '@@switchTypes/NORMAL',
  BROKEN: '@@switchTypes/BROKEN',
  DUAL: '@@switchTypes/DUAL',
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
    switchPlacePosition: {
      width: 47,
      height: 44,
      top: 0,
      left: 29,
    },
    jetPlacePosition: {
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

export const waitingMugParams = { lifeTime: 6000, timeWhenMoneyFly: 2000 };

export const scorePosition = {
  right: 10,
  top: 10,
  width: 100,
  height: 50,
  moneyDisplayPosition: {
    top: 3,
    left: 3,
    right: 3,
    bottom: 27,
  },
};

export const customersReactionsParams = {
  position: {
    width: 150,
    left: 10,
    top: 50,
  },

  lifeTime: 1500,
};

export const customerReactionsTypes = {
  OK: '@@customerReactionsTypes/OK',
  TOO_FEW: '@@customerReactionsTypes/TOO_FEW',
  WRONG_BEER: '@@customerReactionsTypes/WRONG_BEER',
};

export const customerReactionsImgs = importAll(
  require.context('../actor_classes/customersReaction/img', false, /\.png$/),
).reduce(
  (imgs, r, i) => Object.assign(imgs, { [Object.values(customerReactionsTypes)[i]]: r }),
  {},
);

export const damagesParams = {
  quant: 5,

  position: [
    {
      bottom: 70,
      width: 50,
      height: 50,
      left: -50,
    },
    {
      bottom: 70,
      width: 50,
      height: 50,
      right: 30,
    },
  ],

  lifeTime: 1000,
};

export const totalsParams = {
  position: {
    width: 50,
    height: 50,
    top: 70,
  },

  lifeTime: 3000,

  creationTimeout: 200,

  valueToCreate: 5,

  swayRange: 10,
};

export const timeDisplayParams = {
  position: {
    right: 10,
    top: 80,
    width: 140,
    height: 50,
  },

  dayAndNightPosition: {
    top: 10,
    left: 0,
    right: 0,
    height: 120,
  },

  progressBarPosition: {
    top: 45,
    right: 0,
    width: 140,
    height: 5,
  },
};
