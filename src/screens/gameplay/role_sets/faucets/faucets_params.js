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

export const switchTypes = {
  NORMAL: '@@switchTypes/NORMAL',
  BROKEN: '@@switchTypes/BROKEN',
  DUAL: '@@switchTypes/DUAL',
};

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

export const faucetModels = {
  normalIPA: {
    size: {
      width: 80,
    },
    imgPhases: importAll(require.context('./img/normalIPA', false, /\.png$/)).map((img) => {
      imagesDataURL.addElement(img);
      return img;
    }),
    beerTypes: [beerTypes.IPA],
    switchType: switchTypes.NORMAL,
    mugPlacePosition: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
    },
    handlePlacePosition: handlesTypes.normal,
    jetPlacePosition: {
      height: 80,
      top: 130,
      left: 17,
    },
  },
  normalLGR: {
    size: {
      width: 80,
    },
    imgPhases: importAll(require.context('./img/normalLGR', false, /\.png$/)).map((img) => {
      imagesDataURL.addElement(img);
      return img;
    }),
    beerTypes: [beerTypes.LGR],
    switchType: switchTypes.NORMAL,
    mugPlacePosition: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
    },
    handlePlacePosition: handlesTypes.normal,
    jetPlacePosition: {
      height: 80,
      top: 130,
      left: 17,
    },
  },
  normalPTR: {
    size: {
      width: 80,
    },
    imgPhases: importAll(require.context('./img/normalPTR', false, /\.png$/)).map((img) => {
      imagesDataURL.addElement(img);
      return img;
    }),
    beerTypes: [beerTypes.PTR],
    switchType: switchTypes.NORMAL,
    mugPlacePosition: {
      width: 90,
      height: 90,
      bottom: 0,
      left: -20,
    },
    handlePlacePosition: handlesTypes.normal,
    jetPlacePosition: {
      height: 80,
      top: 130,
      left: 17,
    },
  },
};
