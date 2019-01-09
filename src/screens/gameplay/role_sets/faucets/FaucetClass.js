/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import jetImg from './img/jet.gif';
import stage from '../../../../stage/stage';
import { switchTypes, faucetParams } from './faucets_params';
import { imagesDataURL, getDataURL } from '../../../../libs/session_storage_lib';

imagesDataURL.addElement(jetImg);

export default class Faucet extends Actor {
  constructor(model, horizontalPosition) {
    const {
      size,
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePosition,
      handlePlacePosition,
      jetPlacePosition,
    } = model;
    super('div', Object.assign({ left: horizontalPosition }, size, faucetParams.position), {
      scaleF: stage.scaleF,
      zIndex: 68,
    });
    setImg(this, getDataURL(imgPhases[0]), { bottom: '0px', width: '100%' });
    const jet = new Actor('div', jetPlacePosition, { scaleF: stage.scaleF });
    setImg(jet, getDataURL(jetImg), { height: '100%' });
    this.linkActor(jet);
    this.params = {
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePosition,
      handlePlacePosition,
      jet,
    };
    this.state = { beer: beerTypes[0], phase: 0 };

    if (switchType === switchTypes.BROKEN || switchType === switchTypes.DUAL) {
      this.state.isOpened = true;
    } else {
      this.state.isOpened = false;
    }
    this.getAppendedAsChild(stage);
  }

  switchState() {
    setImg(this, getDataURL(this.params.imgPhases[this.state.phase]));
  }

  runJet() {
    if (this.state.isOpened) {
      this.params.jet.getAppendedAsChild(this);
    } else {
      this.params.jet.remove();
    }
  }

  /**
   *
   * Life Cycles
   */

  placeMug(mug) {
    this.state.placedMug = mug;
  }

  releaseMug() {
    this.state.placedMug = null;
  }
}
