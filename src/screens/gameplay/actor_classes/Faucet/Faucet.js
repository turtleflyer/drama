/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { switchTypes } from '../../assets/gameplay_params';
import { setImg } from '../../../../libs/helpers_lib';
import { bar } from '../../role_sets/bar';
import jetImg from './img/jet.gif';

export default class Faucet extends Actor {
  constructor(model, horizontalPosition) {
    const {
      size,
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePosition,
      switchPlace,
      jetPlace,
    } = model;
    const { width, height } = size;
    super(document.createElement('div'), {
      width,
      height,
      left: horizontalPosition,
      bottom: 0,
    });
    setImg(this, imgPhases[0], {
      height: '100%',
      width: '100%',
      left: '0',
      right: '0',
      'object-fit': 'contain',
    });
    const jet = new Actor(document.createElement('div'), jetPlace);
    setImg(jet, jetImg, { height: '100%' });
    this.linkActor(jet);
    Object.assign(this, {
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePosition,
      switchPlace,
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

  runJet(openedState) {
    if (openedState) {
      this.jet.getAppendedAsChild(this);
    } else {
      this.jet.remove();
    }
  }
}
