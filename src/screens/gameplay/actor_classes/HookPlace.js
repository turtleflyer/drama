/* eslint-env browser */
import { Actor } from '../../../libs/actors_and_roles';
import { customersTablePosition } from '../assets/gameplay_params';
import { customersTable } from '../role_sets/customersTable/customersTable';
import stage from '../../../role_sets/stage/stage';

export default class HookPlace extends Actor {
  constructor() {
    super('div', customersTablePosition.hookPlace, stage.scaleF);
    this.getAppendedAsChild(customersTable);
    this.attachClassName('hookPlace');
  }

  mugsLine() {
    const { y: originY } = stage.origin;
    const { top, height } = this.node.getBoundingClientRect();
    return (top - originY + (height * 3) / 4) / this.position.scaleF;
  }
}
