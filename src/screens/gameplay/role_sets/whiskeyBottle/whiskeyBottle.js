import { Actor, ActorsSet, registerActionOfType } from '../../../../libs/actors_and_roles';
import { whiskeyBottleParams } from './whiskeyBottle_params';
import stage from '../../../../stage/stage';
import bottleImg from './img/bottle.png';
import { setImg } from '../../../../libs/helpers_lib';
import { bottleToFill } from '../bottleToFill/bottleToFill';
import { addSetPositionXYMethod } from '../../../../libs/class_decorators';

// eslint-disable-next-line
export const whiskeyBottle = new ActorsSet();

whiskeyBottle.name = 'whiskeyBottle';

class WhiskeyBottle extends Actor {
  constructor() {
    super(
      'div',
      { width: whiskeyBottleParams.position.width },
      { scaleF: stage.scaleF, zIndex: 50 },
    );
    this.setPositionXY(whiskeyBottleParams.position);
    setImg(this, bottleImg, { width: '100%', bottom: '0px' });
    this.getAppendedAsChild(stage);
  }

  goToFill() {
    bottleToFill.addElement(this);
  }

  getBackOnTable() {
    this.setPositionXY(whiskeyBottleParams.position);
    whiskeyBottle.addElement(this);
  }
}

addSetPositionXYMethod(WhiskeyBottle);

whiskeyBottle.getInitializer(function () {
  this.addElement(new WhiskeyBottle());
});

registerActionOfType('mousedown', whiskeyBottle, {
  action({ target: bottle, event }) {
    event.preventDefault();
    bottle.goToFill();
  },
}).start();
