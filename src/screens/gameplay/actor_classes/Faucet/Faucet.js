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
    const jet = new Actor(document.createElement('div'), jetPlacePosition);
    setImg(jet, jetImg, { height: '100%' });
    this.linkActor(jet);
    Object.assign(this, {
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePosition,
      switchPlacePosition,
      jet,
      activeState: { beer: beerTypes[0], phase: 0 },
    });
    if (switchType === switchTypes.BROKEN || switchType === switchTypes.DUAL) {
      this.activeState.isOpened = true;
    } else {
      this.activeState.isOpened = false;
    }
    this.getAppendedAsChild(bar);
    this.attachClassName('faucets');
  }

  switchState() {
    setImg(this, this.imgPhases[this.activeState.phase]);
  }

  runJet() {
    if (this.activeState.isOpened) {
      this.jet.getAppendedAsChild(this);
    } else {
      this.jet.remove();
    }
  }
}
