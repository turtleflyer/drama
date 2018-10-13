/* eslint-env browser */
import faucetImg1 from './img/faucet-s1.png';
import faucetImg2 from './img/faucet-s2.png';

export const toCommonParams = {
  scene: document.querySelector('#scene'),
  tickTimeout: 5,
  margin: 3.5,
};

export const initState = {
  reputation: 100,
  drunkFactor: 1,
};

export const sceneDimension = {
  width: 1024,
  height: 640,
};

export const tuneGame = {
  reputationDecrement: -5,
  reputationIncrement: 3,
  drunkFactorIncrement: 0.02,
};

export const beerTypes = { BEER_IPA: '@@beer/IPA' };

export const mugLineParams = {
  topDistance: 220,
};

export const switchTypes = {
  NORMAL: '@@switchType/NORMAL',
  BROKEN: '@@switchType/BROKEN',
  DUAL: '@@switchType/DUAL',
};

export const beerExpenses = { [beerTypes.BEER_IPA]: 5 };

export const toPlaceBar = {
  left: 75,
  top: 210,
  width: 245,
  height: 285,
};

export const faucetsProps = [
  {
    place: {
      left: 100,
      top: 10,
      width: 110,
      height: 275,
    },
    imgPhases: [faucetImg1, faucetImg2],
    beerTypes: [beerTypes.BEER_IPA],
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

export const mugsVolumes = {
  [beerTypes.BEER_IPA]: 4,
};

export const scorePosition = {
  right: 10,
  top: 10,
  width: 100,
  height: 50,
};

export const toPlaceCustomersTable = {
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

export const howLongToWait = 2000;

export const possibleCustomerReactions = {
  OK: '@@customerReaction/OK',
  TOO_FEW: '@@customerReaction/TOO_FEW',
  WRONG_BEER: '@@customerReaction/WRONG_BEER',
};
