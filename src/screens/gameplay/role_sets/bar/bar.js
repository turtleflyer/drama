/* eslint-env browser */
import stage from '../../../../role_sets/stage/stage';
import { Actor, ActorsSet } from '../../../../libs/actors_and_roles';
import { barPosition } from '../../assets/gameplay_params';
import { setImg } from '../../../../libs/helpers_lib';
import barImg from './img/bar.png';

class Bar extends Actor {
  constructor() {
    super('div', barPosition, stage.scaleF);
    setImg(this, barImg, { height: '100%', width: '100%', 'object-fit': 'fill' });
    this.getAppendedAsChild(stage);
    this.attachClassName('bar');
  }
}

// eslint-disable-next-line
export const bar = new ActorsSet();
bar.getInitializer(function () {
  this.addElement(new Bar(stage));
});

bar.name = 'bar';
