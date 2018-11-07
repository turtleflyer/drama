/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import { customersTablePosition } from '../assets/gameplay_params';
import { stage } from '../../../role_sets/stage/stage';

export default class HookPlace extends Actor {
  constructor(table) {
    super(document.createElement('div'), customersTablePosition.hookPlace);
    this.getAppendedAsChild([...table][0]);
    this.attachClassName('hookPlace');
  }

  mugsLine() {
    const { y: originY } = stage.origin;
    const { scaleF } = stage;
    const { top, height } = this.node.getBoundingClientRect();
    return (top - originY + (height * 3) / 4) / scaleF;
  }
}
