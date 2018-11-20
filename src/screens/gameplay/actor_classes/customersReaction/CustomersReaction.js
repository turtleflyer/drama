/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import { customerReactionsImgs, customersReactionsParams } from '../../assets/gameplay_params';
import stage from '../../../../role_sets/stage/stage';
import { setImg } from '../../../../libs/helpers_lib';

let swayPosition = -10;

export default class CustomersReaction extends Actor {
  constructor(reactionType) {
    const { top, left } = customersReactionsParams.position;
    const actualPosition = {
      ...customersReactionsParams.position,
      top: top + swayPosition,
      left: left + swayPosition,
    };
    swayPosition *= -1;
    super(document.createElement('div'), actualPosition, stage.scaleF);
    setImg(this, customerReactionsImgs[reactionType], { width: '100%' });
    this.attachClassName('customersReaction');
    this.getAppendedAsChild(stage);
    this.state.lastTime = Date.now();
  }
}