/* eslint-env browser */
import { beerTypes } from '../../../../stage/gameplay_params';
import { importAll } from '../../../../libs/helpers_lib';
import { imagesDataURL } from '../../../../libs/session_storage_lib';

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
