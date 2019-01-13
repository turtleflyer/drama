/* eslint-env browser */
import { beerTypes } from '../../../../stage/gameplay_params';
import { importAll } from '../../../../libs/helpers_lib';
import { imagesDataURL } from '../../../../libs/session_storage_lib';

const handlesTypes = {
  normal: {
    left: 8,
    width: 50,
    height: 42,
    bottom: 219,
  },
};

const jetPlacePositions = {
  normal: {
    left: 6,
    bottom: 71,
    height: 68,
  },
};

const mugPlacePositions = {
  normal: {
    bottom: 0,
    left: -24,
    right: 24,
    height: 95,
  },
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

export const faucetsPlaces = {
  0: 264,
  1: 176,
  2: 336,
  3: 144,
  4: 384,
};

const normalFaucet = {
  size: {
    width: 80,
  },
  switchType: switchTypes.NORMAL,
  mugPlacePosition: mugPlacePositions.normal,
  handlePlacePosition: handlesTypes.normal,
  jetPlacePosition: jetPlacePositions.normal,
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

export const faucetModels = {
  normalIPA,
  normalLGR,
  normalPTR,
  brokenIPA,
  brokenLGR,
  brokenPTR,
};
