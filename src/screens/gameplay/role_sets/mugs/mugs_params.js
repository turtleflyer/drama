/* eslint-env browser */
import imgIPAEmpty from './img/IPA/IPA_mug_empty.png';
import imgLGREmpty from './img/LGR/LGR_mug_empty.png';
import imgPTREmpty from './img/PTR/PTR_mug_empty.png';
import { importAll } from '../../../../libs/helpers_lib';
import { beerTypes } from '../../../../stage/gameplay_params';
import emptyGlassImg from './img/whiskeyGlass/glass_empty.png';
import fullGlassImg from './img/whiskeyGlass/glass_full.png';
import { imagesDataURL } from '../../../../libs/session_storage_lib';

imagesDataURL.addElements([imgIPAEmpty, imgLGREmpty, imgPTREmpty, emptyGlassImg, fullGlassImg]);

export const mugTypes = {
  [beerTypes.IPA]: {
    img: {
      width: 59,
      empty: imgIPAEmpty,
      fillingPhasesImgs: importAll(
        require.context('./img/IPA/IPA_filling_states', false, /\.png$/),
      ).map((img) => {
        imagesDataURL.addElement(img);
        return img;
      }),
      overfilledPhasesImgs: importAll(
        require.context('./img/IPA/IPA_overfilled_states', false, /\.png$/),
      ).map((img) => {
        imagesDataURL.addElement(img);
        return img;
      }),
    },
    volume: 4,
  },
  [beerTypes.LGR]: {
    img: {
      width: 65,
      empty: imgLGREmpty,
      fillingPhasesImgs: importAll(
        require.context('./img/LGR/LGR_filling_states', false, /\.png$/),
      ).map((img) => {
        imagesDataURL.addElement(img);
        return img;
      }),
      overfilledPhasesImgs: importAll(
        require.context('./img/LGR/LGR_overfilled_states', false, /\.png$/),
      ).map((img) => {
        imagesDataURL.addElement(img);
        return img;
      }),
    },
    volume: 5,
  },
  [beerTypes.PTR]: {
    img: {
      width: 52,
      empty: imgPTREmpty,
      fillingPhasesImgs: importAll(
        require.context('./img/PTR/PTR_filling_states', false, /\.png$/),
      ).map((img) => {
        imagesDataURL.addElement(img);
        return img;
      }),
      overfilledPhasesImgs: importAll(
        require.context('./img/PTR/PTR_overfilled_states', false, /\.png$/),
      ).map((img) => {
        imagesDataURL.addElement(img);
        return img;
      }),
    },
    volume: 3,
  },
};

export const mugsParams = {
  overfillPhaseDuration: 800,
};

export const magsCreatingParams = {
  lineBase: 389,
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
  costOfFilledGlass: 15,
};

export const sequenceLengthDistrToBeConsistent = 5;
