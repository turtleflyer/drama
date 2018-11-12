/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { barPosition } from '../../assets/gameplay_params';
import { setImg } from '../../../../libs/helpers_lib';
import barImg from './img/bar.png';

export default class Bar extends Actor {
  constructor(stage) {
    super(document.createElement('div'), barPosition, stage.scaleF);
    setImg(this, barImg, { height: '100%', width: '100%', 'object-fit': 'fill' });
    this.getAppendedAsChild(stage);
    this.attachClassName('bar');
  }
}
