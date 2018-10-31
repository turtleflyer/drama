/* eslint-env browser */
import { Actor, attachClassName } from '../../../../libs/actors_and_roles';
import { faucetTypes, switchTypes } from '../../assets/gameplay_params';
import { setImg } from '../../../../libs/helpers_lib';
import stage from '../../../../role_sets/stage/stage';
import bar from '../../role_sets/bar';

export default class Faucet extends Actor {
  constructor(type, horizontalPosition) {
    const {
      size,
      imgPhases,
      beerTypes,
      switchType,
      mugPlace,
      switchPlace,
      jetPlace,
      // prettier-ignore
    } = faucetTypes[type];
    const { width, height } = size;
    super(document.createElement('div'), {
      width,
      height,
      left: 100,
      bottom: 0,
    });
    Object.assign(this, {
      imgPhases,
      beerTypes,
      switchType,
      mugPlace,
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
    [...bar][0].node.appendChild(this.node);
    attachClassName(this, 'faucets');
  }
}
