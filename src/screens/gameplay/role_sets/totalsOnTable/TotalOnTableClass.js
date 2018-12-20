/* eslint-env browser */
import { Actor } from '../../../../libs/actors_and_roles';
import stage from '../../../../stage/stage';
import './styles.css';
import { totalsParams } from './totalsOnTable_params';

export default class TotalOnTable extends Actor {
  constructor({ x, y }, isPositive) {
    super(
      'div',
      {
        ...totalsParams.position,
        left: x + (Math.random() * 2 - 1) * totalsParams.swayRange,
        top: y + (Math.random() * 2 - 1) * totalsParams.swayRange,
      },
      { scaleF: stage.scaleF, zIndex: 72 },
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
