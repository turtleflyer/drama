import { Actor, ActorsSet, registerActionOfType } from '../../../../libs/actors_and_roles';
import { whiskeyBottleParams } from './whiskeyBottle_params';
import stage from '../../../../stage/stage';
import bottleImg from './img/bottle.png';
import { setImg, addSetPositionXYMethod } from '../../../../libs/helpers_lib';
import { bottleToFill } from '../bottleToFill/bottleToFill';

class WhiskeyBottle extends Actor {
  constructor() {
    super('div', {}, { scaleF: stage.scaleF, zIndex: 50 });
    addSetPositionXYMethod(this);
    this.setPositionXY(whiskeyBottleParams.position);
    setImg(this, bottleImg, { width: '100%', bottom: '0px' });
    this.getAppendedAsChild(stage);
  }
}

// eslint-disable-next-line
export const whiskeyBottle = new ActorsSet();

whiskeyBottle.name = 'whiskeyBottle';

whiskeyBottle.getInitializer(function () {
  this.addElement(new WhiskeyBottle());
});

registerActionOfType('mousedown', whiskeyBottle, {
  action({ target: bottle, event }) {
    console.log(1);
    event.preventDefault();
    bottleToFill.addElement(bottle);
  },
}).start();
