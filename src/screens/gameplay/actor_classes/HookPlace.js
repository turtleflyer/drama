/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import { customersTablePosition } from '../assets/gameplay_params';

export default class HookPlace extends Actor {
  constructor(stage, table) {
    super(document.createElement('div'), customersTablePosition.hookPlace, stage.scaleF);
    this.stage = stage;
    this.getAppendedAsChild([...table][0]);
    this.attachClassName('hookPlace');
  }

  mugsLine() {
    const { y: originY } = this.stage.origin;
    const { top, height } = this.node.getBoundingClientRect();
    return (top - originY + (height * 3) / 4) / this.position.scaleF;
  }
}
