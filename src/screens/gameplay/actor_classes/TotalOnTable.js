/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import stage from '../../../role_sets/stage/stage';
import { totalsParams } from '../assets/gameplay_params';

export default class TotalOnTable extends Actor {
  constructor(horizontalPosition, isPositive) {
    super(
      'div',
      {
        ...totalsParams.position,
        top: totalsParams.position.top + (Math.random() * 2 - 1) * totalsParams.swayRange,
        left: horizontalPosition + (Math.random() * 2 - 1) * totalsParams.swayRange,
      },
      stage.scaleF,
    );
    if (isPositive) {
      this.node.textContent = '+$1';
      this.attachClassName('totalsOnTable--positive');
    } else {
      this.node.textContent = '-$1';
      this.attachClassName('totalsOnTable--negative');
    }
    this.getAppendedAsChild(stage);
  }
}
