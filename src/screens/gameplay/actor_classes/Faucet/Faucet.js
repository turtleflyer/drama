/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { switchTypes } from '../../assets/gameplay_params';
import { setImg } from '../../../../libs/helpers_lib';
import jetImg from './img/jet.gif';

export default class Faucet extends Actor {
  constructor(bar, model, horizontalPosition) {
    const {
      size,
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePosition,
      switchPlacePosition,
      jetPlacePosition,
    } = model;
    const { width, height } = size;
    super(
      document.createElement('div'),
      {
        width,
        height,
        left: horizontalPosition,
        bottom: 0,
      },
      bar.stage.scaleF,
    );
    setImg(this, imgPhases[0], {
      height: '100%',
      width: '100%',
      left: '0',
      right: '0',
      'object-fit': 'contain',
    });
    this.stage = bar.stage;
    const jet = new Actor(document.createElement('div'), jetPlacePosition);
    setImg(jet, jetImg, { height: '100%' });
    this.linkActor(jet);
    this.params = {
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePosition,
      switchPlacePosition,
      jet,
    };
    this.state = { beer: beerTypes[0], phase: 0 };

    if (switchType === switchTypes.BROKEN || switchType === switchTypes.DUAL) {
      this.state.isOpened = true;
    } else {
      this.state.isOpened = false;
    }
    this.getAppendedAsChild(bar);
    this.attachClassName('faucets');
  }

  switchState() {
    setImg(this, this.params.imgPhases[this.state.phase]);
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
