/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { barPosition } from '../../assets/gameplay_params';
import { setImg } from '../../../../libs/helpers_lib';
import barImg from './img/bar.png';
import stage from '../../../../role_sets/stage/stage';

export default class Bar extends Actor {
  constructor() {
    super(document.createElement('div'), barPosition);
    setImg(this, barImg, { height: '100%', width: '100%', 'object-fit': 'fill' });
    this.getAppendedAsChild(stage);
    this.attachClassName('bar');
  }
}
