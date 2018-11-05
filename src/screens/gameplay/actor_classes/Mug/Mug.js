/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { setImg } from '../../../../libs/helpers_lib';
import { mugTypes, mugsParams } from '../../assets/gameplay_params';

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
    this.getAppendedAsChild(stage);
    this.attachClassName('mugsOnLine');
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