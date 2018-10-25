/* eslint-env browser */
import { mugTypes, mugsParams } from '../../../../common_params';
import { Actor } from '../../../../actors_and_roles';
import { setImg, attachClassName } from '../../../../helpers_lib';

export default class Mug extends Actor {
  constructor(stage, type, horizontalPosition) {
    const { width } = mugTypes[type];
    super(
      document.createElement('div'),
      { x: horizontalPosition, y: mugsParams.lineBase, width },
      stage.scaleF,
    );
    setImg(this, mugTypes[type].empty, { width: '100%', bottom: '0px' });
    this.type = type;
    this.load = {};
    stage.appendAsChild(this);
    attachClassName(this, 'mugsOnLine');
  }

  get position() {
    return { x: this.left + this.width / 2, y: this.top };
  }

  get boundingBox() {
    return this.node.querySelector('img').getBoundingClientRect();
  }

  get rectHeight() {
    return this.boundingBox.height / this.scaleF;
  }

  setPosition(position) {
    const { x, y, width } = position;
    Actor.prototype.setPosition.call(this, {
      left: x - (width || this.width) / 2,
      top: y,
      width,
    });
  }
}
