/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { switchTypes } from '../../assets/gameplay_params';
import { setImg } from '../../../../libs/helpers_lib';
import { bar } from '../../role_sets/bar';

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
    Object.assign(this, {
      imgPhases,
      beerTypes,
      switchType,
      mugPlacePosition,
      switchPlace,
      jetPlace,
      activeState: { beer: beerTypes[0], phase: 0 },
    });
    if (switchType === switchTypes.BROKEN || switchType === switchTypes.DUAL) {
      this.activeState.switchOpened = true;
    } else {
      this.activeState.switchOpened = false;
    }
    setImg(this, this.imgPhases[0], {
      height: '100%',
      width: '100%',
      left: '0',
      right: '0',
      'object-fit': 'contain',
    });
    this.getAppendedAsChild(bar);
    this.attachClassName('faucets');
  }
}
