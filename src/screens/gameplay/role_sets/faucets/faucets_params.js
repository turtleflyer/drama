/* eslint-env browser */
import { beerTypes } from '../../../../stage/gameplay_params';
import { importAll } from '../../../../libs/helpers_lib';
import { imagesDataURL } from '../../../../libs/session_storage_lib';

const handlePositions = {
  normal: {
    left: 8,
    width: 50,
    height: 42,
    bottom: 219,
  },

  dual: {
    left: 36,
    width: 72,
    height: 42,
    bottom: 219,
  },
};

const jetPositions = {
  normal: [
    {
      left: 6,
      bottom: 71,
      height: 68,
    },
  ],

  dual: [
    {
      left: 20,
      bottom: 71,
      height: 68,
    },
    {
      left: 122,
      bottom: 71,
      height: 68,
    },
  ],
};

const mugPlacePositions = {
  normal: [
    {
      bottom: 0,
      left: -24,
      width: 80,
      height: 95,
    },
  ],

  dual: [
    {
      bottom: 0,
      left: -13,
      width: 80,
      height: 95,
    },
    {
      bottom: 0,
      left: 89,
      width: 80,
      height: 95,
    },
  ],
};

export const switchTypes = {
  NORMAL: '@@switchTypes/NORMAL',
  BROKEN: '@@switchTypes/BROKEN',
  DUAL: '@@switchTypes/DUAL',
};

export const brokenSwitchTimeToTry = 150;

export const faucetParams = {
  position: {
    bottom: 92,
  },
};

const normalFaucet = {
  size: {
    width: 80,
  },
  switchType: switchTypes.NORMAL,
  mugPlacePositions: mugPlacePositions.normal,
  handlePosition: handlePositions.normal,
  jetPositions: jetPositions.normal,
};

const dualFaucet = {
  size: {
    width: 146,
  },
  switchType: switchTypes.DUAL,
  mugPlacePositions: mugPlacePositions.dual,
  handlePosition: handlePositions.dual,
  jetPositions: jetPositions.dual,
};

const normalIPA = {
  ...normalFaucet,
  beerTypes: [beerTypes.IPA],
  imgPhases: importAll(require.context('./img/normalIPA', false, /\.png$/)).map((img) => {
    imagesDataURL.addElement(img);
    return img;
  }),
};

const normalLGR = {
  ...normalFaucet,
  beerTypes: [beerTypes.LGR],
  imgPhases: importAll(require.context('./img/normalLGR', false, /\.png$/)).map((img) => {
    imagesDataURL.addElement(img);
    return img;
  }),
};

const normalPTR = {
  ...normalFaucet,
  beerTypes: [beerTypes.PTR],
  imgPhases: importAll(require.context('./img/normalPTR', false, /\.png$/)).map((img) => {
    imagesDataURL.addElement(img);
    return img;
  }),
};

const brokenIPA = {
  ...normalIPA,
  switchType: switchTypes.BROKEN,
};

const brokenLGR = {
  ...normalLGR,
  switchType: switchTypes.BROKEN,
};

const brokenPTR = {
  ...normalPTR,
  switchType: switchTypes.BROKEN,
};

const dualIPALGR = {
  ...dualFaucet,
  beerTypes: [beerTypes.IPA, beerTypes.LGR],
  imgPhases: importAll(require.context('./img/dualIPA_LGR', false, /\.png$/)).map((img) => {
    imagesDataURL.addElement(img);
    return img;
  }),
};

const dualIPAPTR = {
  ...dualFaucet,
  beerTypes: [beerTypes.IPA, beerTypes.LGR],
  imgPhases: importAll(require.context('./img/dualIPA_PTR', false, /\.png$/)).map((img) => {
    imagesDataURL.addElement(img);
    return img;
  }),
};

const dualLGRPTR = {
  ...dualFaucet,
  beerTypes: [beerTypes.IPA, beerTypes.LGR],
  imgPhases: importAll(require.context('./img/dualLGR_PTR', false, /\.png$/)).map((img) => {
    imagesDataURL.addElement(img);
    return img;
  }),
};

export const faucetModels = {
  normalIPA,
  normalLGR,
  normalPTR,
  brokenIPA,
  brokenLGR,
  brokenPTR,
  dualIPALGR,
  dualIPAPTR,
  dualLGRPTR,
};

export const faucetsPlaces = {
  centerNormal: 264,
  centerDual: 220,
  firstNormalOfTwo: 176,
  secondNormalOfTwo: 336,
  firstNormalOfThree: 144,
  thirdNormalOfThree: 384,
  firstDualOfTwo: 130,
  secondDualOfTwo: 305,
};
